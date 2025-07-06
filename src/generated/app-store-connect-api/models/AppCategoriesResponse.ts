/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCategory } from './AppCategory';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppCategoriesResponse = {
    data: Array<AppCategory>;
    included?: Array<AppCategory>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

