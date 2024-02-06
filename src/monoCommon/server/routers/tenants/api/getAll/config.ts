import { Endpoint, METHODS } from "../../../../../Endpoint";
import { Tenant } from "../../../../../../server/models/Tenant";
import { Permissions } from "../../../../../../config";
import { RoleInspector } from "../../../../../../server/utils/roles";

export interface Result {
  data: Array<Tenant>;
}
export interface Params {
  tenantName?: string;
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [RoleInspector],
};
