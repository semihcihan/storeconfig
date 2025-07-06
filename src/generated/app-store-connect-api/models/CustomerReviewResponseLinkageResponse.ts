/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type CustomerReviewResponseLinkageResponse = {
    data: {
        type: CustomerReviewResponseLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace CustomerReviewResponseLinkageResponse {
    export enum type {
        CUSTOMER_REVIEW_RESPONSES = 'customerReviewResponses',
    }
}

