import { RoleAdmin } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";


export interface Result {
  data: {};
}
export interface Params {
  id: string
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleAdmin],
};
