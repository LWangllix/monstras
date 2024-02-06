import { Column, Entity } from "typeorm";
import { Permissions as PermissionsTypes } from "../../config";
import { TenantUserInterface } from "../../monoCommon/interfaces";
import { BaseTenantUser } from "../../monoCommon/server/models/BaseTenantUser";

class Permission {
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.User.statuses),
    default: PermissionsTypes.User.statuses.DISABLED,
  })
  user?: string;
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.TenantOwner.statuses),
    default: PermissionsTypes.TenantOwner.statuses.DISABLED,
  })
  tenantOwner?: string;
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.UsersAdmin.statuses),
    default: PermissionsTypes.UsersAdmin.statuses.DISABLED,
  })
  usersAdmin?: string;

  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.Investigator.statuses),
    default: PermissionsTypes.Investigator.statuses.DISABLED,
  })
  investigator: string;
}

@Entity()
export class TenantUser extends BaseTenantUser implements TenantUserInterface {
  @Column(() => Permission)
  permission: Permission;
}

export default TenantUser;
