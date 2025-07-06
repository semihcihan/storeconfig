/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppClipAdvancedExperienceImage = {
    type: AppClipAdvancedExperienceImage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        imageAsset?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    links?: ResourceLinks;
};
export namespace AppClipAdvancedExperienceImage {
    export enum type {
        APP_CLIP_ADVANCED_EXPERIENCE_IMAGES = 'appClipAdvancedExperienceImages',
    }
}

