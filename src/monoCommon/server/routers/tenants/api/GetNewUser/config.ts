import { NewTenantSimpleUserInterface } from "../../../../../../types";
import { RoleFisherInTenant } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";


export interface Result extends NewTenantSimpleUserInterface {

}
export interface Params {
  id: string;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleFisherInTenant],
};
