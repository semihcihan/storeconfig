/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppCustomProductPage = {
    type: AppCustomProductPage.type;
    id: string;
    attributes?: {
        name?: string;
        url?: string;
        visible?: boolean;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppCustomProductPage.type;
                id: string;
            };
        };
        appCustomProductPageVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appCustomProductPageVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppCustomProductPage {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGES = 'appCustomProductPages',
    }
}

