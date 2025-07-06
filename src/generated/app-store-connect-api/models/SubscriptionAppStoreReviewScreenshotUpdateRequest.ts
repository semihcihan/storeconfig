/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionAppStoreReviewScreenshotUpdateRequest = {
    data: {
        type: SubscriptionAppStoreReviewScreenshotUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace SubscriptionAppStoreReviewScreenshotUpdateRequest {
    export enum type {
        SUBSCRIPTION_APP_STORE_REVIEW_SCREENSHOTS = 'subscriptionAppStoreReviewScreenshots',
    }
}

