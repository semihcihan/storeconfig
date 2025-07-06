/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { TerritoryCode } from './TerritoryCode';
export type CustomerReview = {
    type: CustomerReview.type;
    id: string;
    attributes?: {
        rating?: number;
        title?: string;
        body?: string;
        reviewerNickname?: string;
        createdDate?: string;
        territory?: TerritoryCode;
    };
    relationships?: {
        response?: {
            links?: RelationshipLinks;
            data?: {
                type: CustomerReview.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace CustomerReview {
    export enum type {
        CUSTOMER_REVIEWS = 'customerReviews',
    }
}

