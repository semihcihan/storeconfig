/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppInfoPrimaryCategoryLinkageResponse = {
    data: {
        type: AppInfoPrimaryCategoryLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppInfoPrimaryCategoryLinkageResponse {
    export enum type {
        APP_CATEGORIES = 'appCategories',
    }
}

