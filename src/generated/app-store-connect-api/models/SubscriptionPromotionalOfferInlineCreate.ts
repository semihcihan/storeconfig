/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionPromotionalOfferInlineCreate = {
    type: SubscriptionPromotionalOfferInlineCreate.type;
    id?: string;
    attributes: {
        duration: SubscriptionOfferDuration;
        name: string;
        numberOfPeriods: number;
        offerCode: string;
        offerMode: SubscriptionOfferMode;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionPromotionalOfferInlineCreate.type;
                id: string;
            };
        };
        prices?: {
            data?: Array<{
                type: 'subscriptionPromotionalOfferPrices';
                id: string;
            }>;
        };
    };
};
export namespace SubscriptionPromotionalOfferInlineCreate {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFERS = 'subscriptionPromotionalOffers',
    }
}

