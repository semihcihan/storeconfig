/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaFeedbackScreenshotImage } from './BetaFeedbackScreenshotImage';
import type { DeviceConnectionType } from './DeviceConnectionType';
import type { DeviceFamily } from './DeviceFamily';
import type { Platform } from './Platform';
import type { ResourceLinks } from './ResourceLinks';
export type BetaFeedbackScreenshotSubmission = {
    type: BetaFeedbackScreenshotSubmission.type;
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
        screenshots?: Array<BetaFeedbackScreenshotImage>;
    };
    relationships?: {
        build?: {
            data?: {
                type: BetaFeedbackScreenshotSubmission.type;
                id: string;
            };
        };
        tester?: {
            data?: {
                type: BetaFeedbackScreenshotSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaFeedbackScreenshotSubmission {
    export enum type {
        BETA_FEEDBACK_SCREENSHOT_SUBMISSIONS = 'betaFeedbackScreenshotSubmissions',
    }
}

