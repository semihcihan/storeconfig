/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Subscription } from './Subscription';
import type { SubscriptionOfferCode } from './SubscriptionOfferCode';
import type { SubscriptionOfferCodeCustomCode } from './SubscriptionOfferCodeCustomCode';
import type { SubscriptionOfferCodeOneTimeUseCode } from './SubscriptionOfferCodeOneTimeUseCode';
import type { SubscriptionOfferCodePrice } from './SubscriptionOfferCodePrice';
export type SubscriptionOfferCodeResponse = {
    data: SubscriptionOfferCode;
    included?: Array<(Subscription | SubscriptionOfferCodeOneTimeUseCode | SubscriptionOfferCodeCustomCode | SubscriptionOfferCodePrice)>;
    links: DocumentLinks;
};

