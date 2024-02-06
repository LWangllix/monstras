import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";
import { UserInterface } from "../../../../../interfaces";

export interface Result {
  user: UserInterface;
}
export interface Params {
  userId: string;
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [],
};
