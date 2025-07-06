/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseLocalization } from './InAppPurchaseLocalization';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type InAppPurchaseLocalizationsResponse = {
    data: Array<InAppPurchaseLocalization>;
    included?: Array<InAppPurchaseV2>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

