import _path from 'path';
import fs from 'fs';
import bpmnXMLToFlow from '../bpmnXMLToFlow';
import { Flow } from '../../types/Flow';
import { queryTasks } from '../index';
function getFlow(path: string): Flow {
    const text = fs.readFileSync(_path.join(__dirname, path), 'utf-8');
    const flow = bpmnXMLToFlow(text);
    return flow;
}

describe("get tasks test flow", () => {
    test("expect no tasks", async () => {
        const flow = getFlow('./test.bpmn');
        const result = queryTasks({ flow, startTaskId: 'Task_1' });
        expect(result).toEqual([]);
    });
    test("expect 4 tasks from a", async () => {
        const flow = getFlow('./test.bpmn');
        const result = queryTasks({ flow, startTaskId: 'a' });
        expect(result.length).toEqual(4);
    });
    test("expect 2 direct tasks from a", async () => {
        const flow = getFlow('./test.bpmn');
        const result = queryTasks({ flow, startTaskId: 'a', directOnlyTasks: true });
        expect(result.length).toEqual(2);
    });
});


describe("get tasks exclusive flow", () => {
    test("expect no tasks", async () => {
        const flow = getFlow('./exclusive.bpmn');
        const result = queryTasks({ flow, startTaskId: 'Task_1' });
        expect(result).toEqual([]);
    });
    test("expect 4 tasks from a", async () => {
        const flow = getFlow('./exclusive.bpmn');
        const result = queryTasks({ flow, startTaskId: 'a' });
        expect(result.length).toEqual(4);
    });
    test("expect 3 direct tasks from a", async () => {
        const flow = getFlow('./exclusive.bpmn');
        const result = queryTasks({ flow, startTaskId: 'a', directOnlyTasks: true });
        expect(result.length).toEqual(3);
    });
    test("expect 1 direct tasks from a", async () => {
        const flow = getFlow('./exclusive.bpmn');
        flow.sequenceFlows.find(f => f.id === "g1b").condition = (params: any) => params.a === "b";
        flow.sequenceFlows.find(f => f.id === "ac").condition = (params: any) => params.a === "b";
        const result = queryTasks({ flow, startTaskId: 'a', directOnlyTasks: true, state: { a: "not a" } });
        expect(result.length).toEqual(1);
    });
});
