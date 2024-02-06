import { Permissions, TenantOwner } from "../../../../../../config";
import { Tenant } from "../../../../../../server/models/Tenant";
import { RoleAdmin, RoleFisherInTenant, RoleInspector } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  tenant: Tenant;
}
export interface Params {
  id: string;
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [RoleAdmin, RoleInspector, RoleFisherInTenant],
};
