/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreReviewDetailCreateRequest = {
    data: {
        type: AppStoreReviewDetailCreateRequest.type;
        attributes?: {
            contactFirstName?: string;
            contactLastName?: string;
            contactPhone?: string;
            contactEmail?: string;
            demoAccountName?: string;
            demoAccountPassword?: string;
            demoAccountRequired?: boolean;
            notes?: string;
        };
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreReviewDetailCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreReviewDetailCreateRequest {
    export enum type {
        APP_STORE_REVIEW_DETAILS = 'appStoreReviewDetails',
    }
}

