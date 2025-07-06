/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreReviewDetailUpdateRequest = {
    data: {
        type: AppStoreReviewDetailUpdateRequest.type;
        id: string;
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
    };
};
export namespace AppStoreReviewDetailUpdateRequest {
    export enum type {
        APP_STORE_REVIEW_DETAILS = 'appStoreReviewDetails',
    }
}

