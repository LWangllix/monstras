import { Permissions } from "../../../../../../config";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  id: string;
}
export interface Params {
  userId: string;
  permissions: Array<string>;
  tenants: Array<string>;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [Permissions.Admin.id]
};
