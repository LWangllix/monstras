import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";

export interface Result {
}
export interface Params {
  tenatId: number;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [],
};
