import { Endpoint, METHODS } from "../../../../../Endpoint";
import { User } from "../../../../../../server/models/User";
import { Pagination } from "../../../../../utils/paginate";
import { Permissions } from "../../../../../../config";

export interface Result {
  data: User[];
  total: number;
}
export interface Params extends Pagination {

}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [Permissions.Admin.id],
};
