/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppCustomProductPage } from './AppCustomProductPage';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppCustomProductPagesResponse = {
    data: Array<AppCustomProductPage>;
    included?: Array<(App | AppCustomProductPageVersion)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

