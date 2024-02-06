import { PERMISSION_STATUSES } from "../config";
import { UserInterface } from "../monoCommon/interfaces";

export function hasPersonalAccount(user: UserInterface) {
  return user.permission.user === PERMISSION_STATUSES.ENABLED || user.permission.admin === PERMISSION_STATUSES.ENABLED || user.permission.inspector === PERMISSION_STATUSES.ENABLED || user.permission.inspector === PERMISSION_STATUSES.APPROVER;
}
