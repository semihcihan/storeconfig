/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionPriceCreateRequest = {
    data: {
        type: SubscriptionPriceCreateRequest.type;
        attributes?: {
            startDate?: string;
            preserveCurrentPrice?: boolean;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionPriceCreateRequest.type;
                    id: string;
                };
            };
            territory?: {
                data?: {
                    type: SubscriptionPriceCreateRequest.type;
                    id: string;
                };
            };
            subscriptionPricePoint: {
                data: {
                    type: SubscriptionPriceCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionPriceCreateRequest {
    export enum type {
        SUBSCRIPTION_PRICES = 'subscriptionPrices',
    }
}

