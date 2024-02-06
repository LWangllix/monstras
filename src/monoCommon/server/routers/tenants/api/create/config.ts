import { Permissions } from "../../../../../../config";
import { RoleAdmin } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  id: string;
}
export interface Params {
  name: string;
  email: string;
  municipalities: Array<string>;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleAdmin],
};
