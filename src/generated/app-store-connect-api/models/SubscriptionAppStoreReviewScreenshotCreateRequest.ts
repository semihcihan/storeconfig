/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionAppStoreReviewScreenshotCreateRequest = {
    data: {
        type: SubscriptionAppStoreReviewScreenshotCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionAppStoreReviewScreenshotCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionAppStoreReviewScreenshotCreateRequest {
    export enum type {
        SUBSCRIPTION_APP_STORE_REVIEW_SCREENSHOTS = 'subscriptionAppStoreReviewScreenshots',
    }
}

