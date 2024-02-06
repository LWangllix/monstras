import { Endpoint, METHODS } from "../../../../../monoCommon/Endpoint";


export interface Result {

}
export interface Params {
  xml: string,
  id: string
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true
};
