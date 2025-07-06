/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReviewSubmissionItemCreateRequest = {
    data: {
        type: ReviewSubmissionItemCreateRequest.type;
        relationships: {
            reviewSubmission: {
                data: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersion?: {
                data?: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
            appCustomProductPageVersion?: {
                data?: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperiment?: {
                data?: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperimentV2?: {
                data?: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
            appEvent?: {
                data?: {
                    type: ReviewSubmissionItemCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace ReviewSubmissionItemCreateRequest {
    export enum type {
        REVIEW_SUBMISSION_ITEMS = 'reviewSubmissionItems',
    }
}

