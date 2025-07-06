/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
import type { WinBackOfferPrice } from './WinBackOfferPrice';
export type WinBackOfferPricesResponse = {
    data: Array<WinBackOfferPrice>;
    included?: Array<(Territory | SubscriptionPricePoint)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

