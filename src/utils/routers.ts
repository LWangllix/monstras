import { useRouter } from "next/router";
import { useContext } from "react";
import { or } from "../monoCommon/server/utils/hasPermission";
import {
  RoleAdmin,
  RoleFisher,
  RoleFisherFreelancerEnabled,
  RoleFisherInTenantEnabled,
  RoleInspector
} from "../server/utils/roles";
import { UserContext } from "./AppContextProvider";

export const locationTypes = {
  baras: "baras",
  other: "vidaus_vandens_telkinys",
  polder: "polderis",
}


export const ROUTERS: Array<{ path: string, permissions: Array<any> }> = [
  { path: "/zurnalas", permissions: [RoleFisher]},
  { path: "/zurnalas/[id]", permissions: [RoleFisher]},
  { path: "/irankiai", permissions: [RoleFisher] },
  { path: "/irankiai/[id]", permissions: [RoleFisher] },
  { path: "/naujas-irankis", permissions: [RoleFisher] },
  { path: "/irankiu-statymas", permissions: [or(RoleFisherFreelancerEnabled, RoleFisherInTenantEnabled)] },
  { path: "/pagauta-zuvis-laive", permissions: [or(RoleFisherFreelancerEnabled, RoleFisherInTenantEnabled)] },
  { path: "/pagauta-zuvis-laive/[id]", permissions: [or(RoleFisherFreelancerEnabled, RoleFisherInTenantEnabled)] },
  { path: "/pagauta-zuvis-krante", permissions: [or(RoleFisherFreelancerEnabled, RoleFisherInTenantEnabled)] },
  { path: "/nariai", permissions: [RoleFisherInTenantEnabled] },
  { path: "/nariai/[id]", permissions: [RoleFisherInTenantEnabled] },
  { path: "/laimikis", permissions: [or(RoleFisherFreelancerEnabled, RoleFisherInTenantEnabled)] },
  { path: "/vidinis", permissions: [RoleInspector]},
  { path: "/vidinis/[event]", permissions: [RoleInspector]},
  { path: "/vidinis/zuvu-istekliu-naudotojai", permissions: [RoleInspector]},
  { path: `/vidinis/zuvu-istekliu-naudotojai/[imone]`, permissions: [RoleInspector]},
  { path: `/vidinis/zuvu-istekliu-naudotojai/[imone]/zurnalas`, permissions: [RoleInspector]},
  { path: `/vidinis/zuvu-istekliu-naudotojai/[imone]/irankiai`, permissions: [RoleInspector]},
  { path: `/vidinis/zuvu-istekliu-naudotojai/[imone]/nariai`, permissions: [RoleInspector]},
  { path: "/admin", permissions: [RoleAdmin]},
];

export const getRoutePermission = (path) => {
  return ROUTERS.find(route =>  path === route.path)?.permissions || [];
}

export function usePermissionChecker() {
  const {
    user: {user},
    hasPermission,
  } = useContext(UserContext);
  const router = useRouter();
  const currentPath = router.pathname;
  const routePermissions = getRoutePermission(currentPath);
  const permission = hasPermission(routePermissions);
  if (!user) {
    router.replace("/login");
  } else if (!permission) {
    router.replace("/profiliai");
  }
  return permission;
}