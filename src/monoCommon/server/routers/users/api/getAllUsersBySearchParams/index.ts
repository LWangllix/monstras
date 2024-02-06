import { getRepository } from "typeorm";
import { Permissions } from "../../../../../../config";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Params, Result } from "./config";

export async function method(
  user: User,
  params: Params, etc
): Promise<RouterError | Result> {
  const {
    searchLastName,
    searchName,
    permission,
    page,
    take,
    orderBy,
    sort,
    tenant,
  } = params;
  const skipValue = () => (page === 1 ? 0 : (page - 1) * take);

  const query = getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.tenants", "tenants");

  // if no sorting or ordering specified, use defaults
  query.orderBy(`user.${orderBy || "id"}`, sort || "ASC");

  if (searchName) {
    query.andWhere("user.name ilike :name", {
      name: `%${searchName}%`,
    });
  }

  if (searchLastName) {
    query.andWhere("user.lastName ilike :username", {
      username: `%${searchLastName}%`,
    });
  }

  if (permission) {
    const fieldName = 'permission' + permission.charAt(0).toUpperCase() + permission.slice(1);
    query.andWhere(`user.${fieldName} = ${Permissions.User.statuses.ENABLED}`);
  }

  if (tenant) {
    const subQuery = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.tenants", "tenants")
      .andWhere("tenants.name = :namee", {
        namee: tenant,
      })
      .select(["user.id"])
      .getMany();
    if (subQuery.length > 0) {
      query.andWhere("user.id IN (:...id)", {
        id: subQuery.map((user) => user.id),
      });
    } else {
      query.andWhere("1=0");
    }
  }

  query.skip(skipValue());
  query.take(take);
  return { users: await query.getManyAndCount() };
}
