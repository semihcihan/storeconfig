/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionOfferCodePrice = {
    type: SubscriptionOfferCodePrice.type;
    id: string;
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionOfferCodePrice.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionOfferCodePrice.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionOfferCodePrice {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_PRICES = 'subscriptionOfferCodePrices',
    }
}

