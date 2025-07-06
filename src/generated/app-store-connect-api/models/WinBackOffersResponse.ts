/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { WinBackOffer } from './WinBackOffer';
import type { WinBackOfferPrice } from './WinBackOfferPrice';
export type WinBackOffersResponse = {
    data: Array<WinBackOffer>;
    included?: Array<WinBackOfferPrice>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

