/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionPrice = {
    type: SubscriptionPrice.type;
    id: string;
    attributes?: {
        startDate?: string;
        preserved?: boolean;
    };
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionPrice.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionPrice.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionPrice {
    export enum type {
        SUBSCRIPTION_PRICES = 'subscriptionPrices',
    }
}

