import { RoleTenantOwner, RoleTenantUserAdmin } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
}
export interface Params {
  id: string;
  invited: boolean;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleTenantOwner, RoleTenantUserAdmin],
};
