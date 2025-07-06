/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionCustomerEligibility } from './SubscriptionCustomerEligibility';
import type { SubscriptionOfferCodePriceInlineCreate } from './SubscriptionOfferCodePriceInlineCreate';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferEligibility } from './SubscriptionOfferEligibility';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionOfferCodeCreateRequest = {
    data: {
        type: SubscriptionOfferCodeCreateRequest.type;
        attributes: {
            name: string;
            customerEligibilities: Array<SubscriptionCustomerEligibility>;
            offerEligibility: SubscriptionOfferEligibility;
            duration: SubscriptionOfferDuration;
            offerMode: SubscriptionOfferMode;
            numberOfPeriods: number;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionOfferCodeCreateRequest.type;
                    id: string;
                };
            };
            prices: {
                data: Array<{
                    type: 'subscriptionOfferCodePrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<SubscriptionOfferCodePriceInlineCreate>;
};
export namespace SubscriptionOfferCodeCreateRequest {
    export enum type {
        SUBSCRIPTION_OFFER_CODES = 'subscriptionOfferCodes',
    }
}

