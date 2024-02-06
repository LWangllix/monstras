
import {
    Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

class Writer {
    @Column({ nullable: true })
    ip?: string;
    @Column({ nullable: true })
    user?: string
    @Column({ nullable: true })
    tenant?: string
    @Column({ nullable: true })
    tenantUser?: string
}

@Entity()
export class BaseEntity {
    id?: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt?: Date;
    @Column({ nullable: true })
    modifyPath?: string;
    @Column(() => Writer)
    createdBy: Writer = {};
    @Column(() => Writer)
    updatedBy?: Writer;
    @Column(() => Writer)
    deletedBy: Writer;
}