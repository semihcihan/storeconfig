/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type InAppPurchaseImage = {
    type: InAppPurchaseImage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        assetToken?: string;
        imageAsset?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        state?: InAppPurchaseImage.state;
    };
    relationships?: {
        inAppPurchase?: {
            data?: {
                type: InAppPurchaseImage.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseImage {
    export enum type {
        IN_APP_PURCHASE_IMAGES = 'inAppPurchaseImages',
    }
    export enum state {
        AWAITING_UPLOAD = 'AWAITING_UPLOAD',
        UPLOAD_COMPLETE = 'UPLOAD_COMPLETE',
        FAILED = 'FAILED',
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

