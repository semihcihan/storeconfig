/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceConnectionType } from './DeviceConnectionType';
import type { DeviceFamily } from './DeviceFamily';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaFeedbackCrashSubmission = {
    type: BetaFeedbackCrashSubmission.type;
    id: string;
    attributes?: {
        createdDate?: string;
        comment?: string;
        email?: string;
        deviceModel?: string;
        osVersion?: string;
        locale?: string;
        timeZone?: string;
        architecture?: string;
        connectionType?: DeviceConnectionType;
        pairedAppleWatch?: string;
        appUptimeInMilliseconds?: number;
        diskBytesAvailable?: number;
        diskBytesTotal?: number;
        batteryPercentage?: number;
        screenWidthInPoints?: number;
        screenHeightInPoints?: number;
        appPlatform?: Platform;
        devicePlatform?: Platform;
        deviceFamily?: DeviceFamily;
        buildBundleId?: string;
    };
    relationships?: {
        crashLog?: {
            links?: RelationshipLinks;
        };
        build?: {
            data?: {
                type: BetaFeedbackCrashSubmission.type;
                id: string;
            };
        };
        tester?: {
            data?: {
                type: BetaFeedbackCrashSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaFeedbackCrashSubmission {
    export enum type {
        BETA_FEEDBACK_CRASH_SUBMISSIONS = 'betaFeedbackCrashSubmissions',
    }
}

