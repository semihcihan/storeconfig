/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppReviewSubmissionCreateRequest = {
    data: {
        type: BetaAppReviewSubmissionCreateRequest.type;
        relationships: {
            build: {
                data: {
                    type: BetaAppReviewSubmissionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaAppReviewSubmissionCreateRequest {
    export enum type {
        BETA_APP_REVIEW_SUBMISSIONS = 'betaAppReviewSubmissions',
    }
}

