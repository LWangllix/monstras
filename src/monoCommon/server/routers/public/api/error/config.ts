import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result { }

export interface Params {
  errorMsg: any,
  url: any,
  lineNumber: any,
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true,
};
