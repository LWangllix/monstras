import { getRepository } from "typeorm";
import { User } from "../../models/User";
import { Tenant } from "../../models/Tenant";
import { Fishing } from "../../models/Fishing";

export const getActiveFishingByUserAndTenant = async (
  user: User,
  tenant: Tenant
): Promise<Fishing> => {
  const notClosedFishingQuery = getRepository(Fishing)
    .createQueryBuilder("Fishing")
    .leftJoin("Fishing.user", "user")
    .leftJoin("Fishing.tenant", "tenant")
    .andWhere("Fishing.start_date is not null")
    .andWhere("Fishing.end_date is  null");

  if (tenant) {
    notClosedFishingQuery.andWhere("tenant.id = :tenantId", {
      tenantId: tenant.id,
    });
  } else {
    notClosedFishingQuery.andWhere("tenant is null");
  }

  return await notClosedFishingQuery
    .andWhere("user.id = :id", { id: user.id })
    .getOne();
};
