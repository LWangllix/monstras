import { PERMISSION_STATUSES } from "../../../config";
import {
  Permission,
  Type,
  OperatorExecutor,
  OperatorFactory,
} from "../../Endpoint";
import { UserInterface } from "../../interfaces";

export const hasPermission = (
  user: UserInterface,
  perm: Permission,
  tenantUserId?: string
) => {
  // Deprecated - use and() operator
  if (Array.isArray(perm)) {
    return perm.every((p) => hasPermission(user, p, tenantUserId));
  }

  // Operator
  if (typeof perm === "function") {
    return perm(user, tenantUserId);
  }

  try {
    if (typeof perm === "string") {
      return user.permission[perm] === PERMISSION_STATUSES.ENABLED;
    } else {
      const status = perm.status || PERMISSION_STATUSES.ENABLED;
      if (perm.type === Type.user) {
        return user.permission[perm.permission] === status;
      }
      if (!tenantUserId) {
        return false;
      }
      const tenantUser = user.tenantUsers.find((t) => t.id == tenantUserId);
      if (perm.type === Type.tenant) {
        return tenantUser.tenant.permission[perm.permission] === status;
      }
      return tenantUser.permission[perm.permission] === status;
    }
  } catch (error) {
    return false;
  }
};

export const or: OperatorFactory = (
  ...perms: Permission[]
): OperatorExecutor => {
  return (user: UserInterface, tenantUserId?: string) => {
    return perms.some((permission: Permission) => {
      return hasPermission(user, permission, tenantUserId);
    });
  };
};

export const and: OperatorFactory = (
  ...perms: Permission[]
): OperatorExecutor => {
  return (user: UserInterface, tenantUserId?: string) => {
    return perms.every((permission: Permission) => {
      return hasPermission(user, permission, tenantUserId);
    });
  };
};
