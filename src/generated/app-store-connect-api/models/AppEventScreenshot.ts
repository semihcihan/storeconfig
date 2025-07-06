/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventAssetType } from './AppEventAssetType';
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppEventScreenshot = {
    type: AppEventScreenshot.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        imageAsset?: ImageAsset;
        assetToken?: string;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
        appEventAssetType?: AppEventAssetType;
    };
    relationships?: {
        appEventLocalization?: {
            data?: {
                type: AppEventScreenshot.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppEventScreenshot {
    export enum type {
        APP_EVENT_SCREENSHOTS = 'appEventScreenshots',
    }
}

