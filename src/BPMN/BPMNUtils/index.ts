import { getRepository } from "typeorm";
import { FlowActor } from "../FlowActor";
import { RouterEndpoint } from "../../monoCommon/Endpoint";
import RouterError from "../../monoCommon/RouterError";
import { Flow } from "../types/Flow";
interface Params {
    actorId: string;
    [key: string]: any;
}
export const markStep = async (endPoint: RouterEndpoint, params: Params): Promise<{
    actorId?: string;
    taskId?: string;
}> => {
    if (endPoint.flowId) {
        const actor = (await getRepository(FlowActor).findOne({ where: { id: params.actorId } })) || new FlowActor();
        actor.bpmnId = endPoint.flowId;
        actor.taskId = endPoint.flowId;
        await getRepository(FlowActor).save(actor);
        return { actorId: actor.id, taskId: endPoint.taskId };
    }
    return {};
};

export function queryTasks(params: { flow: Flow, startTaskId: string, directOnlyTasks?: boolean, state?: any }): Array<RouterEndpoint> {
    const { flow, startTaskId, directOnlyTasks, state } = params;
    var queue: Array<{ id: string }> = flow.userTasks.filter(t => t.id === startTaskId);
    var visited = [];
    const sequenceFlows = flow.sequenceFlows.filter(s => s.condition ? s.condition(state) : true);
    while (queue.length > 0) {
        var node = queue.shift();
        if (!visited.includes(node)) {
            visited.push(node);
            sequenceFlows.filter(g => g.sourceRef == node.id).forEach(sequenceFlow => {
                (() => {
                    const nextTask = flow.userTasks.find(t => t.id == sequenceFlow.targetRef);
                    if (nextTask) {
                        if (directOnlyTasks) {
                            visited.push(nextTask);
                        } else {
                            queue.push(nextTask);
                        }
                    }
                })();
                (() => {
                    const nextGateway = flow.exclusiveGateways.find(t => t.id == sequenceFlow.targetRef);
                    if (nextGateway) {
                        queue.push(nextGateway);
                    }
                })();
            });
        }
    }
    return visited.filter(t => t.id != startTaskId).filter(t => t.type === "userTask");
}
export const validateStep = async (schema, currentStep: string, nextStep: string, state: any) => {

    return null;
}

export const getNextSteps = async (flow: Flow, currentStep: string, state: any) => {

}
