/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from './Platform';
export type ReviewSubmissionUpdateRequest = {
    data: {
        type: ReviewSubmissionUpdateRequest.type;
        id: string;
        attributes?: {
            platform?: Platform;
            submitted?: boolean;
            canceled?: boolean;
        };
    };
};
export namespace ReviewSubmissionUpdateRequest {
    export enum type {
        REVIEW_SUBMISSIONS = 'reviewSubmissions',
    }
}

