/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionOfferCode } from './SubscriptionOfferCode';
import type { SubscriptionOfferCodeCustomCode } from './SubscriptionOfferCodeCustomCode';
import type { SubscriptionOfferCodeOneTimeUseCode } from './SubscriptionOfferCodeOneTimeUseCode';
import type { SubscriptionOfferCodePrice } from './SubscriptionOfferCodePrice';
export type SubscriptionOfferCodesResponse = {
    data: Array<SubscriptionOfferCode>;
    included?: Array<(Subscription | SubscriptionOfferCodeOneTimeUseCode | SubscriptionOfferCodeCustomCode | SubscriptionOfferCodePrice)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

