import { User } from "../../../server/models/User"
import finalSchema from "./bpmn"
import { FromSchema } from "json-schema-to-ts";
import RouterRequest from "../../../monoCommon/RouterRequest";

export const save = (user: User, params: FromSchema<typeof finalSchema>, routerRequest: RouterRequest) => {

}
export const get = (id: string) => {

}