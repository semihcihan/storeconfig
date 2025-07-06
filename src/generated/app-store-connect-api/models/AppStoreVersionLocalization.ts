/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersionLocalization = {
    type: AppStoreVersionLocalization.type;
    id: string;
    attributes?: {
        description?: string;
        locale?: string;
        keywords?: string;
        marketingUrl?: string;
        promotionalText?: string;
        supportUrl?: string;
        whatsNew?: string;
    };
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: AppStoreVersionLocalization.type;
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
export namespace AppStoreVersionLocalization {
    export enum type {
        APP_STORE_VERSION_LOCALIZATIONS = 'appStoreVersionLocalizations',
    }
}

