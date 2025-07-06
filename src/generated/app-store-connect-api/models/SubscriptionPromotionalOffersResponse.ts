/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionPromotionalOffer } from './SubscriptionPromotionalOffer';
import type { SubscriptionPromotionalOfferPrice } from './SubscriptionPromotionalOfferPrice';
export type SubscriptionPromotionalOffersResponse = {
    data: Array<SubscriptionPromotionalOffer>;
    included?: Array<(Subscription | SubscriptionPromotionalOfferPrice)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

