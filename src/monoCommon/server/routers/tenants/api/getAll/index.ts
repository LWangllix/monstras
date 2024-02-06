import { Tenant } from "../../../../../../server/models/Tenant";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { getRepository } from "typeorm";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  const tenants = getRepository(Tenant).createQueryBuilder("tenant");
  if (params.tenantName && params.tenantName !== "") {
    tenants.andWhere("tenant.name ilike :name", {
      name: `%${params.tenantName}%`,
    });
  }

  return {
    data: await tenants.getMany(),
  };
}
