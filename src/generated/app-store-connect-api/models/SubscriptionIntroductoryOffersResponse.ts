/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionIntroductoryOffer } from './SubscriptionIntroductoryOffer';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionIntroductoryOffersResponse = {
    data: Array<SubscriptionIntroductoryOffer>;
    included?: Array<(Subscription | Territory | SubscriptionPricePoint)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

