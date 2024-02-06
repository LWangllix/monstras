import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";

import { Result, Params } from "./config";

export const method = async (
  appUser: User,
  params: Params
): Promise<Result | RouterError> => {
  return null
};
