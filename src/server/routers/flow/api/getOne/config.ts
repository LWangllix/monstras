import { Flow } from "../../../../../BPMN/types/Flow";
import { Endpoint, METHODS } from "../../../../../monoCommon/Endpoint";
import { Pagination } from "../../../../../monoCommon/utils/paginate";
import {
  RoleFisherEnabled,
  RoleFisherInTenantEnabled,
} from "../../../../utils/roles";

export interface Result {
  xml: string;
}
export interface Params {
  id: string
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true
};
