/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type InAppPurchaseAppStoreReviewScreenshot = {
    type: InAppPurchaseAppStoreReviewScreenshot.type;
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
        inAppPurchaseV2?: {
            data?: {
                type: InAppPurchaseAppStoreReviewScreenshot.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseAppStoreReviewScreenshot {
    export enum type {
        IN_APP_PURCHASE_APP_STORE_REVIEW_SCREENSHOTS = 'inAppPurchaseAppStoreReviewScreenshots',
    }
}

