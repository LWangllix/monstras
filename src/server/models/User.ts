import { Column, Entity, Index, OneToMany } from "typeorm";
import { Permissions as PermissionsTypes } from "../../config";
import TenantUser from "./TenantUser";
import { UserInterface } from "../../monoCommon/interfaces";
import { BaseUser } from "../../monoCommon/server/models/BaseUser";
import { OperatorExecutor, Permission as RequestPermission } from "../../monoCommon/Endpoint";
import { hasPermission } from "../../monoCommon/server/utils/hasPermission";

export class Permission {
  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.User.statuses),
    default: PermissionsTypes.User.statuses.DISABLED,
  })
  user: string;

  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.Admin.statuses),
    default: PermissionsTypes.Admin.statuses.DISABLED,
  })
  admin: string;

  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.Inspector.statuses),
    default: PermissionsTypes.Inspector.statuses.DISABLED,
  })
  inspector: string;

  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.Investigator.statuses),
    default: PermissionsTypes.Investigator.statuses.DISABLED,
  })
  investigator: string;
}

@Entity()
export class User extends BaseUser implements UserInterface {

  @OneToMany(() => TenantUser, (tenantUser) => tenantUser.user)
  tenantUsers: TenantUser[];

  @Column(() => Permission)
  permission: Permission;


  hasPermission(
    perm: RequestPermission | OperatorExecutor,
    tenantUserId?: string
  ): boolean {
    return hasPermission(this, perm, tenantUserId);
  }
}
