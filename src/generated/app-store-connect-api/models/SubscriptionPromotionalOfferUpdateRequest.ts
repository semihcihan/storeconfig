/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPromotionalOfferPriceInlineCreate } from './SubscriptionPromotionalOfferPriceInlineCreate';
export type SubscriptionPromotionalOfferUpdateRequest = {
    data: {
        type: SubscriptionPromotionalOfferUpdateRequest.type;
        id: string;
        relationships?: {
            prices?: {
                data?: Array<{
                    type: 'subscriptionPromotionalOfferPrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<SubscriptionPromotionalOfferPriceInlineCreate>;
};
export namespace SubscriptionPromotionalOfferUpdateRequest {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFERS = 'subscriptionPromotionalOffers',
    }
}

