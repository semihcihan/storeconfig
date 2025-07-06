/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type CustomerReviewResponseV1 = {
    type: CustomerReviewResponseV1.type;
    id: string;
    attributes?: {
        responseBody?: string;
        lastModifiedDate?: string;
        state?: CustomerReviewResponseV1.state;
    };
    relationships?: {
        review?: {
            data?: {
                type: CustomerReviewResponseV1.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace CustomerReviewResponseV1 {
    export enum type {
        CUSTOMER_REVIEW_RESPONSES = 'customerReviewResponses',
    }
    export enum state {
        PUBLISHED = 'PUBLISHED',
        PENDING_PUBLISH = 'PENDING_PUBLISH',
    }
}

