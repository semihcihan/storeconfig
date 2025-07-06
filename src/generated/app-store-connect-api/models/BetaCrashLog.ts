/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type BetaCrashLog = {
    type: BetaCrashLog.type;
    id: string;
    attributes?: {
        logText?: string;
    };
    links?: ResourceLinks;
};
export namespace BetaCrashLog {
    export enum type {
        BETA_CRASH_LOGS = 'betaCrashLogs',
    }
}

