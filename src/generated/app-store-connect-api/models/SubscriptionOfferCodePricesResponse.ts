/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionOfferCodePrice } from './SubscriptionOfferCodePrice';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionOfferCodePricesResponse = {
    data: Array<SubscriptionOfferCodePrice>;
    included?: Array<(Territory | SubscriptionPricePoint)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

