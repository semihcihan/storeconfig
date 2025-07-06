/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppCustomProductPageVersion = {
    type: AppCustomProductPageVersion.type;
    id: string;
    attributes?: {
        version?: string;
        state?: AppCustomProductPageVersion.state;
        deepLink?: string;
    };
    relationships?: {
        appCustomProductPage?: {
            data?: {
                type: AppCustomProductPageVersion.type;
                id: string;
            };
        };
        appCustomProductPageLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appCustomProductPageLocalizations';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppCustomProductPageVersion {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_VERSIONS = 'appCustomProductPageVersions',
    }
    export enum state {
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        ACCEPTED = 'ACCEPTED',
        APPROVED = 'APPROVED',
        REPLACED_WITH_NEW_VERSION = 'REPLACED_WITH_NEW_VERSION',
        REJECTED = 'REJECTED',
    }
}

