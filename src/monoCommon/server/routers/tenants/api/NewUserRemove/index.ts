import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import NewTenantUser from "../../../../../../server/models/NewTenantUser";
import RouterRequest from "../../../../../RouterRequest";
import TenantUser from "../../../../../../server/models/TenantUser";
import { PERMISSION_STATUSES } from "../../../../../../config";
import saveEntity from "../../../../saveEntity";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  if (params.invited) {
    await getRepository(NewTenantUser).delete(params.id);
  } else {
    if (user.id === params.id) {
      return new RouterError(400, [{ msgs: ["Negalima pašalinti savo paskyros"] }]);
    }
    const tenantUser = await getRepository(TenantUser).findOne({ where: { id: params.id } });
    if (tenantUser) {
      tenantUser.permission.user = PERMISSION_STATUSES.DISABLED;
      tenantUser.permission.tenantOwner = PERMISSION_STATUSES.DISABLED;
      tenantUser.permission.usersAdmin = PERMISSION_STATUSES.DISABLED;
      await saveEntity(TenantUser, routerRequest, tenantUser);
    }
  }
  return {};
}
