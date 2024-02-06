import { id } from "date-fns/locale";

import { getRepository } from "typeorm";
import { Password } from "../../../../../../monoCommon/server/models/Password";
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
  const u = params.id
    ? await getRepository(User).findOne({ where: { id: params.id } })
    : new User();
  if (!u) {
    return new RouterError(404);
  }
  u.email = params.email;
  u.email = params.email;
  u.username = params.username;
  u.lastName = params.lastName;
  u.phone = params.phone;
  u.name = params.name;
  u.permission = params.permission;
  await saveEntity(User, routerRequest, u);
  if (`${params.password}`.length > 4) {
    const PasswordRepo = getRepository(Password);
    const dbPassword = await PasswordRepo.findOne({
      relations: ["user"],
      where: { user: u },
    });

    const password = dbPassword || new Password();
    password.attempts = 0;
    password.user = u;
    password.value = await Password.generateHash(
      password.user.id,
      params.password
    );
    await saveEntity(Password, routerRequest, password);
  }
  return { data: u };
}
