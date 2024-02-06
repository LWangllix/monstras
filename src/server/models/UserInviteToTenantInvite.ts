import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Code,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserInviteToTenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  tenantId: string;
  @Column()
  code: string;
  @Column({ nullable: true })
  email?: string;
  @Column({ nullable: true })
  status?: string;
}
