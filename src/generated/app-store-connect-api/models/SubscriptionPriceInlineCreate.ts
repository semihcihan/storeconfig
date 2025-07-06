/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionPriceInlineCreate = {
    type: SubscriptionPriceInlineCreate.type;
    id?: string;
    attributes?: {
        startDate?: string;
        preserveCurrentPrice?: boolean;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionPriceInlineCreate.type;
                id: string;
            };
        };
        territory?: {
            data?: {
                type: SubscriptionPriceInlineCreate.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionPriceInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace SubscriptionPriceInlineCreate {
    export enum type {
        SUBSCRIPTION_PRICES = 'subscriptionPrices',
    }
}

