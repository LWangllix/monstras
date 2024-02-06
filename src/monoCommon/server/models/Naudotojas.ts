import { BaseEntity, ViewColumn, ViewEntity } from "typeorm";
import { Permissions } from "../../../config";
import { NaudotojasInterface } from "../../interfaces";

@ViewEntity({
  expression: `
  select  u.id, CONCAT(u.name, ' ', u."lastName") as name, to_jsonb(u."permissionUser") as "permission", u.phone, u.email, null  as code, false as isTenant from public.user u 
where u."permissionUser" = '${Permissions.User.statuses.ENABLED}' or u."permissionUser" = '${Permissions.User.statuses.SUSPENDED}'
UNION ALL (
 select tenant.id ,tenant.name, to_jsonb(tenant."permissionUser") as "permission", phone , email , tenant.code , true  as isTenant from tenant 
)`,
})
export class Naudotojas extends BaseEntity implements NaudotojasInterface {
  @ViewColumn()
  id: string;
  @ViewColumn()
  name: string;
  @ViewColumn()
  phone: string;
  @ViewColumn()
  email: string;
  @ViewColumn()
  code: string;
  @ViewColumn({ name: "istenant" })
  isTenant: boolean;
  @ViewColumn()
  permission: string;
}
