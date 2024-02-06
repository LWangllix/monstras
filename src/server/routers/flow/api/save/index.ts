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

  fs.writeFileSync(`./src/BPMN/flows/${params.id}/bpmn.bpmn`, params.xml, "utf8");
  return null

};

