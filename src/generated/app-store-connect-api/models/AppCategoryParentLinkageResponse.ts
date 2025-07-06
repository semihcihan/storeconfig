/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppCategoryParentLinkageResponse = {
    data: {
        type: AppCategoryParentLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppCategoryParentLinkageResponse {
    export enum type {
        APP_CATEGORIES = 'appCategories',
    }
}

