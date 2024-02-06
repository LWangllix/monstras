import { id } from "date-fns/locale";

import { getRepository } from "typeorm";
import { Password } from "../../../../../../monoCommon/server/models/Password";
import { Tenant } from "../../../../../../server/models/Tenant";
import TenantUser from "../../../../../../server/models/TenantUser";
import { User } from "../../../../../../server/models/User";
import saveEntity from "../../../../saveEntity";
import RouterError from "../../../../../RouterError";
import RouterRequest from "../../../../../RouterRequest";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const t = params.id
    ? await getRepository(Tenant).findOne({
        where: { id: params.id },
        relations: ["tenantUsers", "tenantUsers.user"],
      })
    : new Tenant();
  if (!t) {
    return new RouterError(404);
  }
  t.name = params.name;
  t.email = params.email;
  t.phone = params.phone;
  t.code = params.code;
  t.permission = params.permission;
  t.tenantUsers = t.tenantUsers || [];
  await saveEntity(Tenant, routerRequest, t);
  for (let tenantUserI = 0; tenantUserI < t.tenantUsers.length; tenantUserI++) {
    const tenantUser = t.tenantUsers[tenantUserI];
    if (!params.tenantUsers.some((pT) => pT.id === tenantUser.id)) {
      await getRepository(TenantUser).remove(tenantUser);
    }
  }
  await Promise.all(
    params.tenantUsers.map(async (pTU) => {
      pTU.tenant = t;
      await saveEntity(TenantUser, routerRequest, pTU);
    })
  );
  return { data: t };
}
