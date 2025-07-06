/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { PromotedPurchase } from './PromotedPurchase';
import type { Subscription } from './Subscription';
export type PromotedPurchasesResponse = {
    data: Array<PromotedPurchase>;
    included?: Array<(InAppPurchaseV2 | Subscription)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

