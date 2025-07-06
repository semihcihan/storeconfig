/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventAssetType } from './AppEventAssetType';
export type AppEventScreenshotCreateRequest = {
    data: {
        type: AppEventScreenshotCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
            appEventAssetType: AppEventAssetType;
        };
        relationships: {
            appEventLocalization: {
                data: {
                    type: AppEventScreenshotCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEventScreenshotCreateRequest {
    export enum type {
        APP_EVENT_SCREENSHOTS = 'appEventScreenshots',
    }
}

