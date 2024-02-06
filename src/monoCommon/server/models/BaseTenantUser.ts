import { BaseEntity } from "./BaseEntity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../server/models/User";
import { Tenant } from "../../../server/models/Tenant";

export class BaseTenantUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => User, (user) => user.tenantUsers, { onDelete: "CASCADE" })
  user: User;
  @ManyToOne(() => Tenant, (tenant) => tenant.tenantUsers, {
    onDelete: "CASCADE"
  })
  tenant: Tenant;
  @Column()
  phone: string;
  @Column()
  email: string;
}