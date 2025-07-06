/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppClipHeaderImage = {
    type: AppClipHeaderImage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        imageAsset?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    relationships?: {
        appClipDefaultExperienceLocalization?: {
            data?: {
                type: AppClipHeaderImage.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppClipHeaderImage {
    export enum type {
        APP_CLIP_HEADER_IMAGES = 'appClipHeaderImages',
    }
}

