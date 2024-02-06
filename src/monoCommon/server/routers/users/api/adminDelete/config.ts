import { Endpoint, METHODS } from "../../../../../Endpoint";
import { Permissions } from "../../../../../../config";

export interface Result {
  data: {};
}
export interface Params {
  id: string;
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [Permissions.Admin.id],
};
