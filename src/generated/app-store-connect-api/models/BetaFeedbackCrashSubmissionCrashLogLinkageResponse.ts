/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BetaFeedbackCrashSubmissionCrashLogLinkageResponse = {
    data: {
        type: BetaFeedbackCrashSubmissionCrashLogLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BetaFeedbackCrashSubmissionCrashLogLinkageResponse {
    export enum type {
        BETA_CRASH_LOGS = 'betaCrashLogs',
    }
}

