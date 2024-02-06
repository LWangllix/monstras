import { getRepository, Raw } from "typeorm";
import { User } from "../../../../../../server/models/User";
import { Recover } from "../../../../models/Recover";
import { Password } from "../../../../../../monoCommon/server/models/Password";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  if (user) {
    return new RouterError(400, [{ msgs: ["User must be logged out"] }]);
  }

  const exist = await getRepository(Recover).findOne({
    relations: ["password", "password.user"],
    where: {
      secret: params.recover,
      createdAt: Raw((alias) => `${alias} > NOW() - INTERVAL '1 Hour'`),
    },
  });

  // 1 hour
  if (!exist) {
    return new RouterError(400, [
      {
        key: "recoverObjectByRecoverProperty",
        msgs: ["Slaptažodžio keitimo nuoroda negalioja."],
      },
    ]);
  }

  if (params.password.length < 6) {
    return new RouterError(400, [
      {
        key: "validation",
        msgs: ["Minimalus slaptažodžio ilgis - 6 simboliai."],
      },
    ]);
  }

  exist.password.value = await Password.generateHash(
    exist.password.user.id,
    params.password
  );

  exist.password.attempts = 0;
  await getRepository(Password).save(exist.password);
  await getRepository(Recover).delete({ secret: exist.secret });

  return { exist: true };
}
