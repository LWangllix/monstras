import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import NewTenantUser from "../../../../../../server/models/NewTenantUser";
import RouterRequest from "../../../../../RouterRequest";

import TenantUser from "../../../../../../server/models/TenantUser";
import { Permissions } from "../../../../../../config";
import saveEntity from "../../../../saveEntity";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const id = params.id;
  const newTenantUser = id ? await getRepository(NewTenantUser).findOne({ where: { id: params.id } }) : new NewTenantUser();
  if (!newTenantUser) {
    return new RouterError(400);
  }
  if (!id || (newTenantUser.code !== params.code)) {
    const inviteExist = await getRepository(NewTenantUser).findOne({
      where: {
        code: params.code,
        tenant: {
          id: routerRequest.tenant.id
        }
      }
    });
    if (inviteExist) {
      return new RouterError(200, [{ key: "code", msgs: ["Asmuo tokiu kodu jau pakviestas"] }]);
    }
  }
  const userExist = await getRepository(TenantUser).findOne({
    relations: ["tenant", "user"],
    where: {
      tenant: {
        id: routerRequest.tenant.id
      },
      user: {
        username: params.code
      }
    }
  });
  if (userExist) {
    if (userExist.permission.user === Permissions.User.statuses.ENABLED) {
      return new RouterError(200, [{ key: "code", msgs: ["Asmuo tokiu kodu jau yra įmonėje"] }]);
    }
  };
  newTenantUser.name = params.name;
  newTenantUser.email = params.email;
  newTenantUser.phone = params.phone;
  newTenantUser.code = params.code;
  newTenantUser.lastName = params.lastName;
  newTenantUser.tenant = routerRequest.tenant;
  await saveEntity(NewTenantUser, routerRequest, newTenantUser);
  return { id: newTenantUser.id };
}
