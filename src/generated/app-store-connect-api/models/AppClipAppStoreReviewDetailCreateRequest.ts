/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppClipAppStoreReviewDetailCreateRequest = {
    data: {
        type: AppClipAppStoreReviewDetailCreateRequest.type;
        attributes?: {
            invocationUrls?: Array<string>;
        };
        relationships: {
            appClipDefaultExperience: {
                data: {
                    type: AppClipAppStoreReviewDetailCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppClipAppStoreReviewDetailCreateRequest {
    export enum type {
        APP_CLIP_APP_STORE_REVIEW_DETAILS = 'appClipAppStoreReviewDetails',
    }
}

