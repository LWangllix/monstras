import { Column, Entity, Index, OneToMany } from "typeorm";
import { Permissions as PermissionsTypes } from "../../config";
import { TenantInterface } from "../../monoCommon/interfaces";
import { BaseTenant } from "../../monoCommon/server/models/BaseTenant";

class Permission {
  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.User.statuses),
    default: PermissionsTypes.User.statuses.DISABLED,
  })
  user?: string;

  @Index()
  @Column({
    type: "enum",
    enum: Object.values(PermissionsTypes.Investigator.statuses),
    default: PermissionsTypes.Investigator.statuses.DISABLED,
  })
  investigator: string;
}

@Entity()
export class Tenant extends BaseTenant implements TenantInterface {
  @Column(() => Permission)
  permission: Permission;
}


