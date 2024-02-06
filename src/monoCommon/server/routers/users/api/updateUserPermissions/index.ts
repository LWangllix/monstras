import { getRepository } from "typeorm";

import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { intersection } from "lodash";
import { Permissions } from "../../../../../../config";
import { Tenant } from "../../../../../../server/models/Tenant";
import saveEntity from "../../../../saveEntity";
import RouterRequest from "../../../../../RouterRequest";

export function sourceArrayIncludesAllTargetMembers(
  source: Array<string>,
  target: Array<string>
): boolean {
  return intersection(source, target).length === target.length;
}

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  if (
    user.id.toString() === params.userId.toString() &&
    !params.permissions.some((e) => e === "admin")
  ) {
    return new RouterError(409, [
      { key: "userId", msgs: ["Administratorius negali būti pakeistas"] },
    ]);
  }

  // Validate if permissions to be set are correct
  const availablePermissions = Object.values(Permissions).map((p) => p.id);
  const prm = params.permissions;
  const allPermissionsValid =
    intersection(availablePermissions, prm).length === prm.length;
  if (!allPermissionsValid) {
    return new RouterError(400, [
      { key: "permissions", msgs: ["Nėra tokios rolės"] },
    ]);
  }

  // Validate if user whose permissions to be updated exist
  const modifyUser = await getRepository(User).findOne({
    where: { id: params.userId },
  });
  if (!modifyUser) {
    return new RouterError(400, [
      { key: "userId", msgs: ["Nėra tokio naudotojo"] },
    ]);
  }

  const allTenants = await getRepository(Tenant).find();
  const allTenantsNames = await (
    await getRepository(Tenant).find()
  ).map((tenants) => tenants.name);

  if (!checker(allTenants, params.tenants)) {
    return new RouterError(400, [
      { key: "tenant", msgs: ["Nėra tokios/tokių valdybos/valdybų"] },
    ]);
  }


  await saveEntity(User, routerRequest, modifyUser);
  return { id: modifyUser.id };
}

const checker = (arr: Array<Tenant>, target: Array<string>) =>
  target.every((v) => arr.some((tenant) => tenant.name === v));
