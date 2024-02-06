import axios from "axios";
import { METHODS, RouterEndpoint } from "../../Endpoint";
import RouterError from "../../RouterError";
import { jsonValidate } from "../jsonValidate";

let tenantUserId = typeof window !== "undefined" && localStorage?.getItem("tenantUserId");;
export let serverSessionExpires;
export const setTenantUserId = (id?: string) => {
  tenantUserId = id;
}
export default function call<Params, Response>(
  endPoint: RouterEndpoint,
  params: Params & { id?: string }
): Promise<Response | RouterError> {
  return new Promise((resolve, reject) => {
    try {
      const id = params?.id;
      if (endPoint.path.endsWith(":id")) {
        delete params.id;
      }

      const dataPath =
        endPoint.method === METHODS.GET && Object.keys(params).length > 0
          ? `?data=${encodeURIComponent(JSON.stringify(params))}&tenantUserId=${tenantUserId}`
          : `?&tenantUserId=${tenantUserId}`;

      const url = endPoint.path.replace(":id", `${id}`) + dataPath;
      jsonValidate(endPoint, params).then(error => {
        if (error) {
          return resolve(error);
        }
        axios(requestConfig)
          .then((response) => {
            const serverSessionExpiresHeader = response.headers["session-expires"];
            if (serverSessionExpiresHeader) {
              serverSessionExpires = parseInt(serverSessionExpiresHeader) + new Date().getTime();
            }
            const result = <Response>response.data;
            resolve(result);
          })
          .catch((error) => {
            //TODO: handle error
            console.error('ERROR', JSON.stringify(error))
            const e = new RouterError(error?.response?.status, [
              {
                key: "axios",
                msgs: [error.message || ''],
              },
            ]);
            resolve(e);
          });
      });

      const requestConfig = {
        method: endPoint.method,
        url: url,
        data: params,
      };


    } catch (e) {
      console.error(e);
    }
  });

}
