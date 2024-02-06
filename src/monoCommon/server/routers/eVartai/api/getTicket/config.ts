import { Endpoint, METHODS } from "../../../../../Endpoint";

export interface Params {
    originalUrl: string;
}

export interface Result {
    ticket: string;
    actionUrl: string;
}

export const endPoint: Endpoint = {
    method: METHODS.GET,
    public: true
};
