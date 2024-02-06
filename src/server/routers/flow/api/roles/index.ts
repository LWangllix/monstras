import { User } from "../../../../models/User";
import RouterError from "../../../../../monoCommon/RouterError";
import { Result, Params } from "./config";
import RouterRequest from "../../../../../monoCommon/RouterRequest";
import bpmnXMLToFlow from "../../../../../BPMN/BPMNUtils/bpmnXMLToFlow";
import fs from "fs-extra";
export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {

  const flows = fs.readdirSync(`./src/BPMN/flows`).map(bpmnDir => {
    const bpmnXML = fs.readFileSync(`./src/BPMN/flows/${bpmnDir}/bpmn.bpmn`, "utf8");
    const flow = bpmnXMLToFlow(bpmnXML);
    return { id: bpmnDir, flow };

  });
  return {
    data: flows,
    total: flows.length
  }
}
