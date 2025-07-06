/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionOfferCode } from './SubscriptionOfferCode';
import type { SubscriptionOfferCodeCustomCode } from './SubscriptionOfferCodeCustomCode';
export type SubscriptionOfferCodeCustomCodesResponse = {
    data: Array<SubscriptionOfferCodeCustomCode>;
    included?: Array<SubscriptionOfferCode>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

