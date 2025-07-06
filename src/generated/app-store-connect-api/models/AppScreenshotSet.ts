/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { ScreenshotDisplayType } from './ScreenshotDisplayType';
export type AppScreenshotSet = {
    type: AppScreenshotSet.type;
    id: string;
    attributes?: {
        screenshotDisplayType?: ScreenshotDisplayType;
    };
    relationships?: {
        appStoreVersionLocalization?: {
            data?: {
                type: AppScreenshotSet.type;
                id: string;
            };
        };
        appCustomProductPageLocalization?: {
            data?: {
                type: AppScreenshotSet.type;
                id: string;
            };
        };
        appStoreVersionExperimentTreatmentLocalization?: {
            data?: {
                type: AppScreenshotSet.type;
                id: string;
            };
        };
        appScreenshots?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appScreenshots';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppScreenshotSet {
    export enum type {
        APP_SCREENSHOT_SETS = 'appScreenshotSets',
    }
}

