import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import NewTenantUser from "../../../../../../server/models/NewTenantUser";
import RouterRequest from "../../../../../RouterRequest";
import { PERMISSION_STATUSES } from "../../../../../../config";
import { paginate } from "../../../../../utils/paginate";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const tenantUsers = (await getRepository(Tenant).findOne({ where: { id: routerRequest.tenant.id }, relations: ["tenantUsers", "tenantUsers.user"] })).tenantUsers.filter(tenantUser => tenantUser.permission.user === PERMISSION_STATUSES.ENABLED);
  const inviteUsers = await getRepository(NewTenantUser).find({ where: { tenant: routerRequest.tenant } });
  const result = [
    ...tenantUsers.map(tu => {
      const tUser = tu.user;
      return {
        id: tu.id,
        name: tUser.name,
        lastName: tUser.lastName,
        email: tu.email,
        code: tUser.username,
        phone: tu.phone,
        invited: false,
        user: { id: tUser.id }
      }
    }),
    ...inviteUsers.map(inviteUser => {
      return {
        id: inviteUser.id,
        name: inviteUser.name,
        lastName: inviteUser.lastName,
        email: inviteUser.email,
        code: inviteUser.code,
        phone: inviteUser.phone,
        invited: true
      }
    })];
  return paginate(result);

}
