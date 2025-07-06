/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from './Platform';
import type { ResourceLinks } from './ResourceLinks';
export type CustomerReviewSummarization = {
    type: CustomerReviewSummarization.type;
    id: string;
    attributes?: {
        createdDate?: string;
        locale?: string;
        platform?: Platform;
        text?: string;
    };
    relationships?: {
        territory?: {
            data?: {
                type: CustomerReviewSummarization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace CustomerReviewSummarization {
    export enum type {
        CUSTOMER_REVIEW_SUMMARIZATIONS = 'customerReviewSummarizations',
    }
}

