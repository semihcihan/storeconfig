/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from './Platform';
export type ReviewSubmissionCreateRequest = {
    data: {
        type: ReviewSubmissionCreateRequest.type;
        attributes?: {
            platform?: Platform;
        };
        relationships: {
            app: {
                data: {
                    type: ReviewSubmissionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace ReviewSubmissionCreateRequest {
    export enum type {
        REVIEW_SUBMISSIONS = 'reviewSubmissions',
    }
}

