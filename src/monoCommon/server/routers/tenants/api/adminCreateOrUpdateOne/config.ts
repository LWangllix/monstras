import { Permissions } from "../../../../../../config";
import { Tenant } from "../../../../../../server/models/Tenant";
import { RoleAdmin } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  data: Tenant;
}
export interface Params extends Tenant {
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleAdmin],
};
