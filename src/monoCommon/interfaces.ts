import { User } from "../server/models/User";

export interface TenantInterface {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  permission: {
    user?: string;
  };
  deletedAt?: Date;
  tenantUsers: TenantUserInterface[];
}

export interface TenantUserInterface {
  id: string;
  user: User;
  tenant: TenantInterface;
  permission: {
    user?: string;
    tenantOwner?: string;
    usersAdmin?: string;
  };
  phone: string;
  email: string;
}

export interface UserInterface {
  id: string;
  username?: string;
  name: string;
  lastName: string;
  email?: string;
  phone?: string;
  updatedAt: Date;
  permission: {
    user: string;
    admin: string;
    inspector: string;
  };
  tenantUsers: TenantUserInterface[];
}

export interface NaudotojasInterface {
  id: string;
  name: string;
  phone: string;
  email: string;
  code: string;
  isTenant: boolean;
}
