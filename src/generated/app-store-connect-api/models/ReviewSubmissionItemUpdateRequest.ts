/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReviewSubmissionItemUpdateRequest = {
    data: {
        type: ReviewSubmissionItemUpdateRequest.type;
        id: string;
        attributes?: {
            resolved?: boolean;
            removed?: boolean;
        };
    };
};
export namespace ReviewSubmissionItemUpdateRequest {
    export enum type {
        REVIEW_SUBMISSION_ITEMS = 'reviewSubmissionItems',
    }
}

