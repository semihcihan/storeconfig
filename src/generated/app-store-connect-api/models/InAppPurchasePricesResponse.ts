/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchasePrice } from './InAppPurchasePrice';
import type { InAppPurchasePricePoint } from './InAppPurchasePricePoint';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
export type InAppPurchasePricesResponse = {
    data: Array<InAppPurchasePrice>;
    included?: Array<(InAppPurchasePricePoint | Territory)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

