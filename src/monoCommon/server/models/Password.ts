import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../../server/models/User";
import bcrypt from "bcrypt";
import { BaseEntity } from "./BaseEntity";
const saltRounds = 10;
const secret = process.env.PASSWORD_SECRET;

@Entity()
export class Password extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  value: string;
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  attempts: number = 0;

  static async generateHash(userId: string, passwordValue: string) {
    return await bcrypt.hash(userId + secret + passwordValue, saltRounds);
  }

  static async checkHash(
    passwordValue: string,
    passwordHash: string,
    userId: string
  ) {
    return await bcrypt.compare(userId + secret + passwordValue, passwordHash);
  }
}
