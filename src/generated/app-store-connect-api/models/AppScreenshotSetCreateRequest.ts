/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScreenshotDisplayType } from './ScreenshotDisplayType';
export type AppScreenshotSetCreateRequest = {
    data: {
        type: AppScreenshotSetCreateRequest.type;
        attributes: {
            screenshotDisplayType: ScreenshotDisplayType;
        };
        relationships?: {
            appStoreVersionLocalization?: {
                data?: {
                    type: AppScreenshotSetCreateRequest.type;
                    id: string;
                };
            };
            appCustomProductPageLocalization?: {
                data?: {
                    type: AppScreenshotSetCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperimentTreatmentLocalization?: {
                data?: {
                    type: AppScreenshotSetCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppScreenshotSetCreateRequest {
    export enum type {
        APP_SCREENSHOT_SETS = 'appScreenshotSets',
    }
}

