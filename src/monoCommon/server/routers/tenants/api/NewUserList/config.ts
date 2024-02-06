import { Pagination } from "../../../../../utils/paginate";
import { RoleFisherInTenant, RoleTenantOwner, RoleTenantUserAdmin } from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Member {
  id: string,
  name: string,
  lastName: string,
  email: string,
  code: string,
  phone: string,
  invited: boolean,
  user?: {
    id: string
  }
}
export interface Result {
  data: Member[];
  total: number;
}
export interface Params extends Pagination {
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleFisherInTenant],
};
