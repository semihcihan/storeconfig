/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { SubscriptionPromotionalOfferPrice } from './SubscriptionPromotionalOfferPrice';
import type { Territory } from './Territory';
export type SubscriptionPromotionalOfferPricesResponse = {
    data: Array<SubscriptionPromotionalOfferPrice>;
    included?: Array<(Territory | SubscriptionPricePoint)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

