import { Router } from "express";
import { LoggedResponse } from "./server/logger";

import getAppUser, { getDBUser } from "./server/getAppUser";
import { METHODS, RouterEndpoint } from "./Endpoint";
import RouterError from "./RouterError";
import RouterRequest from "./RouterRequest";
import { jsonValidate } from "./utils/jsonValidate";
import { User } from "../server/models/User";
import { markStep } from "../BPMN/BPMNUtils";

export function registerEndpoint(
  router: Router,
  endPoint: RouterEndpoint,
  func: (user: User, params: any, request?: RouterRequest) => any
) {
  const handler = async (req, res: LoggedResponse) => {
    try {
      let getParams = {};
      try {
        getParams = JSON.parse(req.query.data);
      } catch (error) {}

      const bodyParams = req.body || {};
      const params = { ...getParams, ...bodyParams };
      const tenantUserId = req.query.tenantUserId;
      res.logInfo.params = params;
      res.logInfo.tenantId = tenantUserId;
      res.logInfo.userId = getAppUser(req).id;
      if (endPoint.path.endsWith(":id")) {
        //TODO add id check
        const id = req.params.id;
        params.id = id;
      }
      if (endPoint.schema) {
        const error = await jsonValidate(endPoint, params);
        if (error) {
          res.logInfo.requestError = error;
          return res.json(error);
        }
      }
      const user = await getDBUser(req);

      if (!endPoint.public) {
        if (!user) {
          return res.status(401).json("Unauthorized");
        }
      }

      if (endPoint.permissions && endPoint.permissions.length > 0) {
        if (!endPoint.permissions?.some((p) => {
          return user?.hasPermission(p, tenantUserId);
        })) {
          return res.status(401).json("Unauthorized");
        }
      }

      const resultCandidate = await func(user, params, {
        date: new Date(),
        req: req,
        user: user,
        tenantUser: (user?.tenantUsers || []).find(tu => tu.id == tenantUserId),
        tenant: (user?.tenantUsers || []).find(tu => tu.id == tenantUserId)?.tenant,
      });

      if (resultCandidate?.hasOwnProperty("isRouterError")) {
        const error = <RouterError>resultCandidate;
        res.logInfo.requestError = error;
        return res.status(error.status).json(error);
      }
      const result = resultCandidate;
      const step = await markStep(endPoint, params);
      res.json(result);
    } catch (error) {
      const serverError = new RouterError(500);
      console.error(req.method, req.path, error);
      res.logInfo.crashed = error;
      return res.status(serverError.status).json(serverError.errors);
    }
  };

  if (endPoint.method === METHODS.POST) {
    router.post(endPoint.path, handler);
  } else {
    router.get(endPoint.path, handler);
  }
}
