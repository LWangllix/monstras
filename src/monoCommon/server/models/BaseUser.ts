import { BaseEntity } from "./BaseEntity";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import {
  OperatorExecutor,
  Permission as RequestPermission,
} from "../../Endpoint";
import { hasPermission } from "../utils/hasPermission";

export class BaseUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true, nullable: true, select: false })
  username?: string;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  email?: string;
  @Column({ nullable: true })
  phone?: string;
}
