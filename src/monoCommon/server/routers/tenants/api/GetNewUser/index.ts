import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import NewTenantUser from "../../../../../../server/models/NewTenantUser";
import RouterRequest from "../../../../../RouterRequest";
import { PERMISSION_STATUSES } from "../../../../../../config";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const inviteUser = await getRepository(NewTenantUser).findOne({ where: { id: params.id } });
  return inviteUser;
}

