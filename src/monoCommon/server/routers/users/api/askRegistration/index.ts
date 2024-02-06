import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import RouterRequest from "../../../../../RouterRequest";
import { Params, Result } from "./config";

export async function method(
  user: User,
  params: Params,
  req: RouterRequest
): Promise<RouterError | Result> {

  return new RouterError(403);
}
