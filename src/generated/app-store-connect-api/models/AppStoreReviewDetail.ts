/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreReviewDetail = {
    type: AppStoreReviewDetail.type;
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
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: AppStoreReviewDetail.type;
                id: string;
            };
        };
        appStoreReviewAttachments?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreReviewAttachments';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreReviewDetail {
    export enum type {
        APP_STORE_REVIEW_DETAILS = 'appStoreReviewDetails',
    }
}

