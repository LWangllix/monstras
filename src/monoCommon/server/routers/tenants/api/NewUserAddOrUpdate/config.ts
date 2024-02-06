import {
  RoleTenantOwner,
  RoleTenantUserAdmin,
} from "../../../../../../server/utils/roles";
import { Endpoint, METHODS } from "../../../../../Endpoint";

import schema from "./schema";
import { FromSchema } from "json-schema-to-ts";
export interface Result {
  id: string;
}

export interface Params extends FromSchema<typeof schema> {
  id: string;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: false,
  permissions: [RoleTenantUserAdmin, RoleTenantOwner],
  schema,
};
