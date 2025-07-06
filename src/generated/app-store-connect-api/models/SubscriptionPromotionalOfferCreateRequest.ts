/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
import type { SubscriptionPromotionalOfferPriceInlineCreate } from './SubscriptionPromotionalOfferPriceInlineCreate';
export type SubscriptionPromotionalOfferCreateRequest = {
    data: {
        type: SubscriptionPromotionalOfferCreateRequest.type;
        attributes: {
            duration: SubscriptionOfferDuration;
            name: string;
            numberOfPeriods: number;
            offerCode: string;
            offerMode: SubscriptionOfferMode;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionPromotionalOfferCreateRequest.type;
                    id: string;
                };
            };
            prices: {
                data: Array<{
                    type: 'subscriptionPromotionalOfferPrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<SubscriptionPromotionalOfferPriceInlineCreate>;
};
export namespace SubscriptionPromotionalOfferCreateRequest {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFERS = 'subscriptionPromotionalOffers',
    }
}

