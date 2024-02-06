import { Request } from "express";
import { Tenant } from "../server/models/Tenant";
import TenantUser from "../server/models/TenantUser";
import { User } from "../server/models/User";
export default class {
  date: Date = new Date();
  req?: Request;
  tenant: Tenant;
  user: User;
  tenantUser: TenantUser
}
