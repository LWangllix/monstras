import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import RouterRequest from "../../../../../RouterRequest";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const u = await getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.tenantUsers", "tenantUsers")
    .leftJoinAndSelect("tenantUsers.tenant", "tenant")
    .addSelect("user.username")
    .andWhere("user.id = :id", { id: params.id })
    .getOne();

  return {
    data: u,
  };
}
