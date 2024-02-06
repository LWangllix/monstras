import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import { Pagination } from "../../../../../utils/paginate";
import { Permissions } from "../../../../../../config";
import { RoleAdmin } from "../../../../../../server/utils/roles";

export interface Result {
  data: Tenant[];
  total: number;
}
export interface Params extends Pagination { }

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [RoleAdmin],
};
