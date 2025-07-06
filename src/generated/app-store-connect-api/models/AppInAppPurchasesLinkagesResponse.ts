/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type AppInAppPurchasesLinkagesResponse = {
    data: Array<{
        type: 'inAppPurchases';
        id: string;
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

