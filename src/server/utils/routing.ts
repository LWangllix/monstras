import { forEach } from "lodash";
import { hasPermission } from "../../monoCommon/server/utils/hasPermission";
import {
  RoleAdmin,
  RoleFisher,
  RoleFisherInTenant,
  RoleInspector,
} from "./roles";

export const getAuthRoute = (user) => {
  const paths = [];
  let isTenantUser = false;
  if (hasPermission(user, RoleAdmin)) {
    paths.push("/admin");
  }
  if (hasPermission(user, RoleInspector)) {
    paths.push("/vidinis");
  }
  if (hasPermission(user, RoleFisher)) {
    paths.push("/zurnalas");
  }

  forEach(user?.tenantUsers, (tu) => {
    if (hasPermission(user, RoleFisherInTenant, tu.id)) {
      paths.push("/zurnalas");
      isTenantUser = true;
    }
  });
  if (paths.length === 0) {
    return "/negalimaJungtis";
  } else if (paths.length > 1 || (paths.length === 1 && isTenantUser)) {
    return "/profiliai";
  } else {
    return paths[0];
  }
};
