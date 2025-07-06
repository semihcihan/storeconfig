/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type DiagnosticLog = {
    type: DiagnosticLog.type;
    id: string;
    links?: ResourceLinks;
};
export namespace DiagnosticLog {
    export enum type {
        DIAGNOSTIC_LOGS = 'diagnosticLogs',
    }
}

