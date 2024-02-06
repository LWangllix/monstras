import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class HistoryLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    entityId: string;
    @Column({ nullable: true })
    table: string

    @Column({ type: "jsonb", nullable: true })
    data: BaseEntity
}
