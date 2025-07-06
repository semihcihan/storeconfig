/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionOfferCode } from './SubscriptionOfferCode';
import type { SubscriptionOfferCodeOneTimeUseCode } from './SubscriptionOfferCodeOneTimeUseCode';
export type SubscriptionOfferCodeOneTimeUseCodesResponse = {
    data: Array<SubscriptionOfferCodeOneTimeUseCode>;
    included?: Array<SubscriptionOfferCode>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

