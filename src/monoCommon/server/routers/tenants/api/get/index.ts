import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import RouterError from "../../../../../RouterError";
import { getRepository } from "typeorm";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  const tenantById = await getRepository(Tenant).findOne({
    relations: ["tenantUsers", "tenantUsers.user"],
    where: { id: params.id },
  });

  if (!tenantById) {
    return new RouterError(400, [
      { key: "tenantById", msgs: ["Organizacija neegzistuoja"] },
    ]);
  }

  return {
    tenant: tenantById,
  };
}
