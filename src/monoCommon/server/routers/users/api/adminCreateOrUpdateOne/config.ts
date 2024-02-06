import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import { Permissions } from "../../../../../../config";

export interface Result {
  data: User;
}
export interface Params extends User {
  password: string;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [Permissions.Admin.id],
};
