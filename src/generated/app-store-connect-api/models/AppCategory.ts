/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppCategory = {
    type: AppCategory.type;
    id: string;
    attributes?: {
        platforms?: Array<Platform>;
    };
    relationships?: {
        subcategories?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appCategories';
                id: string;
            }>;
        };
        parent?: {
            links?: RelationshipLinks;
            data?: {
                type: AppCategory.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppCategory {
    export enum type {
        APP_CATEGORIES = 'appCategories',
    }
}

