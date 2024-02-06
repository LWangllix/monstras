import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissions as PermissionsTypes } from "../../config";
import { NewTenantUserInterface } from "../../types";
import { BaseEntity } from "../../monoCommon/server/models/BaseEntity";
import { Tenant } from "./Tenant";
import { User } from "./User";



@Entity()
export class NewTenantUser extends BaseEntity implements NewTenantUserInterface {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(() => Tenant, tenant => tenant.tenantUsers, { onDelete: 'CASCADE' })
    tenant: Tenant
    @Column()
    name: string
    @Column()
    lastName: string
    @Column()
    code: string;
    @Column()
    phone: string;
    @Column()
    email: string;
}

export default NewTenantUser;