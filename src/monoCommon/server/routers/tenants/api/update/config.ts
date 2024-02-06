import { RoleTenantOwner } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  id: string;
}
export interface Params {
  id: string;
  name: string;
  email: string;
  municipalities: Array<string>;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  permissions: [RoleTenantOwner],
};
