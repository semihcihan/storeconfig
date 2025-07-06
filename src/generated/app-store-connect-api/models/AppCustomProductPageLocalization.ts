/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppCustomProductPageLocalization = {
    type: AppCustomProductPageLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        promotionalText?: string;
    };
    relationships?: {
        appCustomProductPageVersion?: {
            data?: {
                type: AppCustomProductPageLocalization.type;
                id: string;
            };
        };
        appScreenshotSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appScreenshotSets';
                id: string;
            }>;
        };
        appPreviewSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appPreviewSets';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppCustomProductPageLocalization {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_LOCALIZATIONS = 'appCustomProductPageLocalizations',
    }
}

