import { Flow } from "../../../../../BPMN/types/Flow";
import { Endpoint, METHODS } from "../../../../../monoCommon/Endpoint";
import { Pagination } from "../../../../../monoCommon/utils/paginate";

export interface Result {
  data: Array<{ id: string, flow: Flow }>;
  total: number;
}
export interface Params extends Pagination {

}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true
};
