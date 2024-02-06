import { Endpoint, METHODS } from "../../../../../Endpoint";
import { Tenant } from "../../../../../../server/models/Tenant";
import { Permissions } from "../../../../../../config";
import { RoleAdmin } from "../../../../../../server/utils/roles";

export interface Result {
  data: Tenant;
}
export interface Params {
  id: string
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [RoleAdmin],
};
