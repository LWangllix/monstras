import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";

export interface Result {

}
export interface Params {
  email?: string;
  phone?: string;
  companyName?: string;
  companyCode?: string
  legalPerson: boolean;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [],
};
