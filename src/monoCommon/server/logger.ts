import winston, { format } from 'winston';
import { Application, Request, Response } from "express";
import useragent from 'express-useragent';
const { combine, timestamp, label, printf, prettyPrint } = format;

import Transport from 'winston-transport';
import { getRepository } from 'typeorm';
import { Log } from './models/Log';
import initEnv from '../../server/initEnv';
require('winston-mongodb');

initEnv(["MONGO_LOG"]);

const {
    MONGO_LOG
} = process.env;

class DBTransport extends Transport {
    constructor() {
        super();
    }
    log(info, callback) {
        const message: LogRequest = info.message;
        getRepository(Log).save({ ...message, raw: message });
        callback();
    }
};


export interface UseragentRequest extends Request {
    useragent: {
        isMobile: boolean;
        isDesktop: boolean,
        isBot: boolean,
        browser: string,
        version: string,
        os: string,
        platform: string,
        source: string,
    }
};
export interface LoggedResponse extends Response {
    logInfo: {
        userId: string;
        tenantId: string;
        params: any;
        crashed?: any,
        requestError?: any
    }
}
const logger = winston.createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),

    defaultMeta: { service: 'user-service' },
    transports: [
        new DBTransport(),
        //@ts-ignore
        new winston.transports.MongoDB(
            { db: MONGO_LOG }
        ),
    ],
});

export interface LogRequest {
    started: Date;
    finished?: Date;
    ip: string,
    isMobile: boolean,
    method?: string,
    path?: string,
    browser: string;
    source: string;
    status?: number,
    unauthorized?: boolean,
    responseTime?: number,
    params?: any,
    crashed?: boolean,
    requestError?: any,
    userId?: string,
    tenantId?: string
}
export const logRequest = (request: LogRequest) => {
    logger.info(request);
}

export const addLoggingToRequests = (app: Application) => {
    app.set('trust proxy', true);
    app.use(useragent.express());

    app.use("*", (req: UseragentRequest, res: LoggedResponse, next) => {
        const started = new Date();
        res.logInfo = {
            userId: undefined,
            params: undefined,
            tenantId: undefined,
        };
        res.on('finish', function (e) {

            const finished = new Date();
            logRequest({
                path: req.path,
                crashed: res.logInfo.crashed,
                status: res.statusCode,
                started,
                finished: finished,
                browser: req.useragent.browser,
                source: req.useragent.source,
                responseTime: finished.getTime() - started.getTime(),
                params: res.logInfo.params,
                isMobile: req.useragent.isMobile,
                ip: req.ip,
                method: req.method,
                userId: res.logInfo.userId,
                tenantId: res.logInfo.tenantId
            })
        });
        next();
    })
}
export default logger;
