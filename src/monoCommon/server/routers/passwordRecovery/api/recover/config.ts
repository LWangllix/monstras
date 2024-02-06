import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  exist: boolean;
}
export interface Params {
  recover: string;
  password: string;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true,
};
