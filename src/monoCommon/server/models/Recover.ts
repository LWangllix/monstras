import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { Password } from "./Password";

@Entity()
export class Recover {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Password)
  @JoinColumn()
  password: Password;

  @Column({ unique: true })
  secret: string;

  @CreateDateColumn()
  createdAt: Date;
}
