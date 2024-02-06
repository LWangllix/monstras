import { Permissions } from "../../../../../../config";
import { User } from "../../../../../../server/models/User";
import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  users: [Array<User>, number];
}

export interface Params {
  orderBy?: "id" | "name" | "lastName";
  sort?: "DESC" | "ASC";
  searchName?: string;
  searchLastName?: string;
  permission?: string;
  page?: number;
  take?: number;
  tenant?: string;
}

export const endPoint: Endpoint = {
  method: METHODS.GET,
  public: false,
  permissions: [Permissions.Admin.id],
};
