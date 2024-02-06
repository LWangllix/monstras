export interface Flow {
    userTasks: Array<{
        id: string;
        jsonForm: any;
        candidates: Array<{
            id: string;
            type: string;
        }>;
    }>;
    exclusiveGateways: Array<{ id: string; }>;
    sequenceFlows: Array<{ id: string; sourceRef: string; targetRef: string; condition?: (params: any) => boolean }>;
}
