import { BaseEntity } from "./BaseEntity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TenantUser from "../../../server/models/TenantUser";

export class BaseTenant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  address: string;
  @OneToMany(() => TenantUser, (tenantUser) => tenantUser.tenant)
  tenantUsers: TenantUser[];
}