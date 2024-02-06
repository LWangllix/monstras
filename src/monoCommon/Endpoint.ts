import { Method } from "axios"
import { UserInterface } from "./interfaces";

export const METHODS: { [key: string]: Method } = {
  POST: 'post',
  GET: 'get',
};

export enum Type {
  user = "user",
  tenant = "tenant",
  tenantUser = "tenantUser",
}

export interface PermissionObject {
  permission: string,
  status?: string,
  type?: Type
}


export type OperatorExecutor = (user: UserInterface, tenantUserId?: string) => boolean;
export type OperatorFactory = (...perms: Permission[]) => OperatorExecutor;

export type Permission = string | PermissionObject | Permission[] | OperatorExecutor;


export interface Endpoint {
  method?: Method;
  public?: boolean;
  permissions?: Array<Permission | OperatorExecutor>;
  schema?: any;
  flowId?: string;
  taskId?: string;
}

export interface RouterEndpoint extends Endpoint {
  path: string;
}
