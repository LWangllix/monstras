import { PERMISSION_STATUSES, Permissions } from "../../config";
import { or, and } from "../../monoCommon/server/utils/hasPermission";
import { Type } from "../../monoCommon/Endpoint";

export const RoleTenantOwner = {
  permission: Permissions.TenantOwner.id,
  type: Type.tenantUser,
  status: PERMISSION_STATUSES.ENABLED,
};

export const RoleTenantUserAdmin = {
  permission: Permissions.UsersAdmin.id,
  type: Type.tenantUser,
  status: PERMISSION_STATUSES.ENABLED,
};

export const RoleAdmin = {
  permission: Permissions.Admin.id,
  type: Type.user,
  status: PERMISSION_STATUSES.ENABLED,
};

export const RoleInspector = or(
  {
    permission: Permissions.Inspector.id,
    type: Type.user,
    status: PERMISSION_STATUSES.ENABLED,
  },
  {
    permission: Permissions.Inspector.id,
    type: Type.user,
    status: PERMISSION_STATUSES.APPROVER,
  }
);

export const RoleApprover = {
  permission: Permissions.Inspector.id,
  type: Type.user,
  status: PERMISSION_STATUSES.APPROVER,
};

export const RoleFisherFreelancerEnabled = {
  permission: Permissions.User.id,
  type: Type.user,
  status: PERMISSION_STATUSES.ENABLED,
};

export const RoleFisherFreelancerSuspended = {
  permission: Permissions.User.id,
  type: Type.user,
  status: PERMISSION_STATUSES.SUSPENDED,
};

export const RoleFisherFreelancer = or(
  RoleFisherFreelancerEnabled,
  RoleFisherFreelancerSuspended
);

export const RoleFisherInTenantEnabled = and(
  {
    permission: Permissions.User.id,
    type: Type.tenantUser,
    status: PERMISSION_STATUSES.ENABLED,
  },
  {
    permission: Permissions.User.id,
    type: Type.tenant,
    status: PERMISSION_STATUSES.ENABLED,
  }
);

export const RoleFisherInTenantSuspended = and(
  or(
    {
      permission: Permissions.User.id,
      type: Type.tenantUser,
      status: PERMISSION_STATUSES.ENABLED,
    },
    {
      permission: Permissions.User.id,
      type: Type.tenantUser,
      status: PERMISSION_STATUSES.SUSPENDED,
    }
  ),
  or(
    {
      permission: Permissions.User.id,
      type: Type.tenant,
      status: PERMISSION_STATUSES.ENABLED,
    },
    {
      permission: Permissions.User.id,
      type: Type.tenant,
      status: PERMISSION_STATUSES.SUSPENDED,
    }
  ),
  or(
    {
      permission: Permissions.User.id,
      type: Type.tenantUser,
      status: PERMISSION_STATUSES.SUSPENDED,
    },
    {
      permission: Permissions.User.id,
      type: Type.tenant,
      status: PERMISSION_STATUSES.SUSPENDED,
    }
  )
);

export const RoleFisherInTenant = and(
  or(
    {
      permission: Permissions.User.id,
      type: Type.tenantUser,
      status: PERMISSION_STATUSES.ENABLED,
    },
    {
      permission: Permissions.User.id,
      type: Type.tenantUser,
      status: PERMISSION_STATUSES.SUSPENDED,
    }
  ),
  or(
    {
      permission: Permissions.User.id,
      type: Type.tenant,
      status: PERMISSION_STATUSES.ENABLED,
    },
    {
      permission: Permissions.User.id,
      type: Type.tenant,
      status: PERMISSION_STATUSES.SUSPENDED,
    }
  )
);

export const RoleFisher = or(RoleFisherFreelancer, RoleFisherInTenant);
export const RoleFisherEnabled = or(
  RoleFisherFreelancerEnabled,
  RoleFisherInTenantEnabled
);

export const RoleTenantOwnerFisherEnabled = and(
  RoleTenantOwner,
  RoleFisherInTenantEnabled
);
export const RoleTenantOwnerFisherSuspended = and(
  RoleTenantOwner,
  RoleFisherInTenantSuspended
);

export const RoleInvestigatorFreelancer = {
  permission: Permissions.Investigator.id,
  type: Type.user,
  status: PERMISSION_STATUSES.ENABLED,
};

export const RoleInvestigatorInTenant = and(
  {
    permission: Permissions.Investigator.id,
    type: Type.tenantUser,
    status: PERMISSION_STATUSES.ENABLED,
  },
  {
    permission: Permissions.Investigator.id,
    type: Type.tenant,
    status: PERMISSION_STATUSES.ENABLED,
  }
);

export const RoleInvestigator = or(
  RoleInvestigatorFreelancer,
  RoleInvestigatorInTenant
);


export const roles = [
  { id: "admin", RoleAdmin, name: "Admin" },

  { id: "inspector", RoleInspector, name: "Inspector" },
  { id: "approver", RoleApprover, name: "Approver" },
  { id: "fisher", RoleFisher, name: "Fisher" },
  { id: "fisher-freelancer", RoleFisherFreelancer, name: "Fisher freelancer" },
  { id: "fisher-freelancer-enabled", RoleFisherFreelancerEnabled, name: "Fisher freelancer enabled" },
]
