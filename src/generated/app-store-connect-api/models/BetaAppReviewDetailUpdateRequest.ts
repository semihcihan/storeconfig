/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppReviewDetailUpdateRequest = {
    data: {
        type: BetaAppReviewDetailUpdateRequest.type;
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
export namespace BetaAppReviewDetailUpdateRequest {
    export enum type {
        BETA_APP_REVIEW_DETAILS = 'betaAppReviewDetails',
    }
}

