import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { getRepository } from "typeorm";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  const tenant = await getRepository(Tenant).findOne({
    where: { id: params.id },
  });

  if (!tenant) {
    return new RouterError(400, [{ msgs: ["Nėra tokios organizacijos"] }]);
  }

  await getRepository(Tenant).softDelete({ id: params.id });

  return { id: params.id };
}
