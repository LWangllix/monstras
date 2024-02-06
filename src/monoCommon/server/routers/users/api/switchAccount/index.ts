import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import RouterRequest from "../../../../../RouterRequest";
import { Result, Params } from "./config";

export function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  return new Promise((resolve, reject) => {
    const req = routerRequest.req;
    //@ts-ignore
    req.session.example = 'set on set_save_reload';
    req.session.save(function (err) {
      return {}
    });
  });
}
