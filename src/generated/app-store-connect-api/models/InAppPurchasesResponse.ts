/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { InAppPurchase } from './InAppPurchase';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type InAppPurchasesResponse = {
    data: Array<InAppPurchase>;
    included?: Array<App>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

