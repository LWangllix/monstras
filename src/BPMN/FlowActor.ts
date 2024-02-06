import { Column, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../monoCommon/server/models/BaseEntity";

export class FlowActor extends BaseEntity {
    @Column()
    bpmnId: string;
    @Column()
    taskId: string;
}
