import { json } from "express";
import fs from "fs-extra"
import { merge } from "lodash";
import bpmnXMLToFlow from "./BPMNUtils/bpmnXMLToFlow";
const cheerio = require('cheerio');
const { convertXML, createAST } = require("simple-xml-to-json")

fs.removeSync("./src/BPMN/biipform/routes");
fs.readdirSync(`./src/BPMN/flows`).map(bpmnDir => {
    const bpmnXML = fs.readFileSync(`./src/BPMN/flows/${bpmnDir}/bpmn.bpmn`, "utf8");
    const { userTasks } = bpmnXMLToFlow(bpmnXML);
    const finalSchema = {};
    userTasks.forEach(t => {
        const path = "./src/BPMN/biipform/routes/" + bpmnDir + "/api/" + t.id
        fs.ensureDirSync(path);
        const jsonForm = t.jsonForm;
        merge(finalSchema, jsonForm);
        fs.writeFileSync(path + "/schema.ts", `const schema = ${JSON.stringify({ ...jsonForm })} as const;
    export default schema;`, "utf8");
        fs.writeFileSync(path + "/config.ts", `import schema from "./schema";
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
        taskId: "${t.id}"
      };
      
    `, "utf8");
        fs.writeFileSync(path + "/index.ts", `import { Result, Params } from "./config";
    import RouterRequest from "../../../../../../monoCommon/RouterRequest"; 
    import { User } from "../../../../../../server/models/User";
    import RouterError from "../../../../../../monoCommon/RouterError";
    
    export async function method(
        user: User,
        params: Params, routerRequest: RouterRequest
        ): Promise<RouterError | Result> {
              console.log("params", params);  
              return null;
    }    `, "utf8");
    });
    const finalSchemaString = `const finalSchema =  ${JSON.stringify(finalSchema, null, 4)}  as const
export default finalSchema;   `;
    fs.writeFileSync(`./src/BPMN/flows/${bpmnDir}/bpmn.ts`, finalSchemaString, "utf8");
    console.log(finalSchema);
});

