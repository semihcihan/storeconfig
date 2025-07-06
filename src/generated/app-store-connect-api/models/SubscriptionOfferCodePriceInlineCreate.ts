/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionOfferCodePriceInlineCreate = {
    type: SubscriptionOfferCodePriceInlineCreate.type;
    id?: string;
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionOfferCodePriceInlineCreate.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionOfferCodePriceInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace SubscriptionOfferCodePriceInlineCreate {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_PRICES = 'subscriptionOfferCodePrices',
    }
}

