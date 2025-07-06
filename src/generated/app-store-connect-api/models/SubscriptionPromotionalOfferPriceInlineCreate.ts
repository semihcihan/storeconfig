/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionPromotionalOfferPriceInlineCreate = {
    type: SubscriptionPromotionalOfferPriceInlineCreate.type;
    id?: string;
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionPromotionalOfferPriceInlineCreate.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionPromotionalOfferPriceInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace SubscriptionPromotionalOfferPriceInlineCreate {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFER_PRICES = 'subscriptionPromotionalOfferPrices',
    }
}

