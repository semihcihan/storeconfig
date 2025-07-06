/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppScreenshot = {
    type: AppScreenshot.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        imageAsset?: ImageAsset;
        assetToken?: string;
        assetType?: string;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    relationships?: {
        appScreenshotSet?: {
            data?: {
                type: AppScreenshot.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppScreenshot {
    export enum type {
        APP_SCREENSHOTS = 'appScreenshots',
    }
}

