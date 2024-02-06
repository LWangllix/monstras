import { Type } from "./monoCommon/Endpoint";

export const PERMISSION_STATUSES = {
  APPROVER: "approver",
  SUSPENDED: "suspended",
  ENABLED: "enabled",
  DISABLED: "disabled",
};

const { APPROVER, SUSPENDED, ENABLED, DISABLED } = PERMISSION_STATUSES;

export const Permissions = {
  User: {
    id: "user",
    label: "Aplikacijos naudotojas",
    description: "an user which capable to do fish stocking",
    statuses: {
      SUSPENDED,
      ENABLED,
      DISABLED,
    },
    types: Type,
  },

  Admin: {
    id: "admin",
    label: "Administratorius",
    description: "super power user",
    statuses: {
      ENABLED,
      DISABLED,
    },
    types: {
      user: Type.user,
    },
  },

  Inspector: {
    id: "inspector",
    label: "Inspektorius",
    description: "user with some permissions",
    statuses: {
      APPROVER,
      ENABLED,
      DISABLED,
    },
    types: {
      user: Type.user,
    },
  },

  Investigator: {
    id: "investigator",
    label: "Mokslininkas",
    description: "user who can investigate",
    statuses: {
      ENABLED,
      DISABLED,
    },
    types: {
      user: Type.user,
    },
  },

  UsersAdmin: {
    id: "usersAdmin",
    label: "Vartotojų tenantate tvarkytojas",
    description: "gali pridėti/ išimti varotojus",
    statuses: {
      ENABLED,
      DISABLED,
    },
    types: {
      tenantUser: Type.tenantUser,
    },
  },

  TenantOwner: {
    id: "tenantOwner",
    label: "Organizacijos vadovas",
    description: "Vartotojas gauna šią teisę prisijungęs kaip įmonęs vadovas",
    statuses: {
      ENABLED,
      DISABLED,
    },
    types: {
      tenantUser: Type.tenantUser,
    },
  },
};

export const UserPermissions = [
  Permissions.User,
  Permissions.Admin,
  Permissions.Inspector,
  Permissions.Investigator,
];

export const TenantPermissions = [Permissions.User, Permissions.Investigator];

export const TenantUserPermissions = [
  Permissions.User,
  Permissions.TenantOwner,
  Permissions.UsersAdmin,
  Permissions.Investigator,
];

// TODO: duplicate with RoleTenantUser, replace in code and remove this
export const TenantOwner = {
  permission: Permissions.TenantOwner.id,
  type: Type.tenantUser,
  status: ENABLED,
};
