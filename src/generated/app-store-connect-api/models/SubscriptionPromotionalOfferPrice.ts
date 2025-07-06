/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionPromotionalOfferPrice = {
    type: SubscriptionPromotionalOfferPrice.type;
    id: string;
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionPromotionalOfferPrice.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionPromotionalOfferPrice.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionPromotionalOfferPrice {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFER_PRICES = 'subscriptionPromotionalOfferPrices',
    }
}

