/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Subscription } from './Subscription';
import type { SubscriptionPromotionalOffer } from './SubscriptionPromotionalOffer';
import type { SubscriptionPromotionalOfferPrice } from './SubscriptionPromotionalOfferPrice';
export type SubscriptionPromotionalOfferResponse = {
    data: SubscriptionPromotionalOffer;
    included?: Array<(Subscription | SubscriptionPromotionalOfferPrice)>;
    links: DocumentLinks;
};

