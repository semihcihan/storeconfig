/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseAppStoreReviewScreenshotCreateRequest = {
    data: {
        type: InAppPurchaseAppStoreReviewScreenshotCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            inAppPurchaseV2: {
                data: {
                    type: InAppPurchaseAppStoreReviewScreenshotCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace InAppPurchaseAppStoreReviewScreenshotCreateRequest {
    export enum type {
        IN_APP_PURCHASE_APP_STORE_REVIEW_SCREENSHOTS = 'inAppPurchaseAppStoreReviewScreenshots',
    }
}

