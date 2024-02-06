import { getRepository } from "typeorm";
import { paginate } from "../../../../../utils/paginate";
import { Tenant } from "../../../../../../server/models/Tenant";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  const data = await getRepository(Tenant).find({});
  return paginate(data, params);
}
