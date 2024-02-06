const cheerio = require('cheerio');

import { attempt } from "lodash";
import { Flow } from "../types/Flow";



const bpmnXMLToFlow = (bpmn: string): Flow => {
    const bpmnXml = bpmn.replaceAll("bpmndi:", "").replaceAll("bpmn2:", "").replaceAll("di:", "").replaceAll("biip:jsonForm=\"{", "jsonForm=\"{");
    const doc = cheerio.load(bpmnXml);
    const flow: Flow = {
        userTasks: [],
        exclusiveGateways: [],
        sequenceFlows: []
    }
    doc("userTask").each((i, t) => {
        flow.userTasks.push({
            ...t.attribs,
            candidates: t?.attribs?.candidates ? attempt(JSON.parse, t.attribs.candidates) : [],
            jsonForm: t?.attribs?.jsonform ? attempt(JSON.parse, t.attribs.jsonform) : null,
            type: "userTask"
        });
    });
    doc("exclusiveGateway").each((i, t) => {
        flow.exclusiveGateways.push({ ...t.attribs, type: "exclusiveGateway" });
    });
    doc("sequenceFlow").each((i, t) => {
        const attribs = t.attribs;
        if (!attribs.sourceRef) {
            attribs.sourceRef = attribs.sourceref;
            delete attribs.sourceref;
        }
        if (!attribs.targetRef) {
            attribs.targetRef = attribs.targetref;
            delete attribs.targetref;
        }
        flow.sequenceFlows.push({ ...t.attribs, type: "sequenceFlow" });
    });
    return flow;
};
export default bpmnXMLToFlow;
