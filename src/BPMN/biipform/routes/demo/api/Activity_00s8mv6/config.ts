import schema from "./schema";
     import { FromSchema } from "json-schema-to-ts";    
     import { Endpoint, METHODS } from "./../../../../../../../src/monoCommon/Endpoint";
     export interface Result {
        id: string;
    }
    export interface Params extends FromSchema<typeof schema> {
        id?: string;
        actorId: string;
    }
    
    export const endPoint: Endpoint = {
        public: true,
        method: METHODS.POST,
        schema,
        flowId: "demo",
        taskId: "Activity_00s8mv6"
      };
      
    