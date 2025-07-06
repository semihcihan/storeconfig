/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPage } from './AppCustomProductPage';
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppCustomProductPageVersionsResponse = {
    data: Array<AppCustomProductPageVersion>;
    included?: Array<(AppCustomProductPage | AppCustomProductPageLocalization)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

