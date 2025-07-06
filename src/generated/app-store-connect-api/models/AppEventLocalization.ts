/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppEventLocalization = {
    type: AppEventLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        shortDescription?: string;
        longDescription?: string;
    };
    relationships?: {
        appEvent?: {
            data?: {
                type: AppEventLocalization.type;
                id: string;
            };
        };
        appEventScreenshots?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEventScreenshots';
                id: string;
            }>;
        };
        appEventVideoClips?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEventVideoClips';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppEventLocalization {
    export enum type {
        APP_EVENT_LOCALIZATIONS = 'appEventLocalizations',
    }
}

