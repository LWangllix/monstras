import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import { Recover } from "../../../../models/Recover";
import { Password } from "../../../../models/Password";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { send } from "../../../../../../mail";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  if (user) {
    return new RouterError(400, [{ msgs: ["User must be logged out"] }]);
  }

  const userByUsername = await getRepository(User).findOne({
    where: { username: params.username },
  });

  if (!userByUsername) {
    return new RouterError(400, [
      { key: "userById", msgs: ["Vartotojas nerastas."] },
    ]);
  }

  const password = await getRepository(Password).findOne({
    relations: ["user"],
    where: { user: userByUsername },
  });

  if (!password) {
    return new RouterError(400, [
      { key: "userById", msgs: ["Vartotojas nerastas."] },
    ]);
  }

  const secret = (Math.random() + 1).toString(36).substring(2);

  // Invalidate old recovery for the same password
  const exist = await getRepository(Recover).findOne({
    where: { password },
  });

  if (exist) {
    await getRepository(Recover).delete({ password });
  }

  const recover = new Recover();
  recover.secret = secret;
  recover.password = password;
  await getRepository(Recover).save(recover);

  const link = `${process.env.HOST}/password/recover?secret=${secret}`;
  const subject = "BIĮP slaptažodžio atstatymas";
  const text = `Jūs užsakėte slaptažodžio keitimą. Norėdami pakeisti slaptažodį, sekite šią nuorodą: ${link}`;
  const html = `<div>
  Jūs užsakėte slaptažodžio keitimą.<br/><br/>
  Norėdami pakeisti slaptažodį, sekite šią nuorodą:<br/>
  <a style="font-weight:bold;" href="${link}">
    ${link}
  </a>
</div>`;

  await send(userByUsername.email, subject, text, html);

  return { exist: true };
}
