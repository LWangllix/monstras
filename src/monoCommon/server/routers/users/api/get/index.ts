import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {

  const userId = params.userId
  if (`${userId}` === `${user.id}`) {
    return {
      user: user,
    };
  }

  const userById = await getRepository(User).findOne({
    relations: ["tenants", 'tenants.users'],
    where: { id: params.userId },
  });

  if (!userById) {
    return new RouterError(400, [
      { key: "userById", msgs: ["Naudotojas neegzistuoja"] },
    ]);
  }
  return {
    user: userById,
  };
}
