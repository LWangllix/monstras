import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";
import { Permissions } from "../../../../../../config";

export interface Result {
  data: User;
}
export interface Params {
  id: string
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [Permissions.Admin.id],
};
