/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppStoreReviewAttachment = {
    type: AppStoreReviewAttachment.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    relationships?: {
        appStoreReviewDetail?: {
            data?: {
                type: AppStoreReviewAttachment.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreReviewAttachment {
    export enum type {
        APP_STORE_REVIEW_ATTACHMENTS = 'appStoreReviewAttachments',
    }
}

