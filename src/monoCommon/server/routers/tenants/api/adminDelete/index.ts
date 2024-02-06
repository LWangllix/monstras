import { getRepository } from "typeorm";
import { Tenant } from "../../../../../../server/models/Tenant";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import RouterRequest from "../../../../../RouterRequest";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params, routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const u = await getRepository(Tenant).delete(params.id);
  return {
    data: u,
  };
}
