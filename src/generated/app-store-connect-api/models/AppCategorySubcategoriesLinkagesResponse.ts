/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppCategorySubcategoriesLinkagesResponse = {
    data: Array<{
        type: 'appCategories';
        id: string;
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

