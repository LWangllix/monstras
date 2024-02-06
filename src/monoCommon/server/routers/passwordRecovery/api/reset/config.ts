import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Result {
  exist: boolean;
}
export interface Params {
  username: string;
}

export const endPoint: Endpoint = {
  method: METHODS.POST,
  public: true,
};
