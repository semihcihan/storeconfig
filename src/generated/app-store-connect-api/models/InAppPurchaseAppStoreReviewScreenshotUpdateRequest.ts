/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseAppStoreReviewScreenshotUpdateRequest = {
    data: {
        type: InAppPurchaseAppStoreReviewScreenshotUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace InAppPurchaseAppStoreReviewScreenshotUpdateRequest {
    export enum type {
        IN_APP_PURCHASE_APP_STORE_REVIEW_SCREENSHOTS = 'inAppPurchaseAppStoreReviewScreenshots',
    }
}

