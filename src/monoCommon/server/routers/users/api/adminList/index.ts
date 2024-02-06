import { getRepository } from "typeorm";
import { Permissions } from "../../../../../../config";
import { paginate } from "../../../../../utils/paginate";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
const permissions = Object.values(Permissions).map(v => {
  return { id: v.id, name: v.label }
});
export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {

  const users = await getRepository(User).find({ relations: ["tenantUsers", "tenantUsers.tenant"] });
  return paginate(users, params)
}
