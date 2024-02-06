import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { LogRequest } from "../logger";


@Entity()
export class Log implements LogRequest {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    started: Date;
    @Column({ nullable: true })
    finished?: Date;
    @Column({ nullable: true })
    ip: string
    @Column({ nullable: true })
    isMobile: boolean
    @Column({ nullable: true })
    level: string
    @Column({ nullable: true })
    method?: string
    @Column({ nullable: true })
    path?: string
    @Column({ nullable: true })
    browser: string;
    @Column({ nullable: true })
    status?: number
    @Column({ nullable: true })
    unauthorized?: boolean
    @Column({ nullable: true })
    responseTime?: number
    @Column({ nullable: true })
    source: string; number
    @Column({ type: "jsonb", nullable: true })
    params?: any
    @Column({ nullable: true })
    crashed?: boolean
    @Column({ type: "jsonb", nullable: true })
    requestError?: any;
    @Column({ nullable: true })
    tenantId?: string;
    @Column({ nullable: true })
    userId?: string;
    @Column({ type: "jsonb", nullable: true })
    raw?: any;
}
