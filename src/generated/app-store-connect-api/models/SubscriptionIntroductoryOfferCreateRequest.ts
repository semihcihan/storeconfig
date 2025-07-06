/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
import type { SubscriptionPricePointInlineCreate } from './SubscriptionPricePointInlineCreate';
export type SubscriptionIntroductoryOfferCreateRequest = {
    data: {
        type: SubscriptionIntroductoryOfferCreateRequest.type;
        attributes: {
            startDate?: string;
            endDate?: string;
            duration: SubscriptionOfferDuration;
            offerMode: SubscriptionOfferMode;
            numberOfPeriods: number;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionIntroductoryOfferCreateRequest.type;
                    id: string;
                };
            };
            territory?: {
                data?: {
                    type: SubscriptionIntroductoryOfferCreateRequest.type;
                    id: string;
                };
            };
            subscriptionPricePoint?: {
                data?: {
                    type: SubscriptionIntroductoryOfferCreateRequest.type;
                    id: string;
                };
            };
        };
    };
    included?: Array<SubscriptionPricePointInlineCreate>;
};
export namespace SubscriptionIntroductoryOfferCreateRequest {
    export enum type {
        SUBSCRIPTION_INTRODUCTORY_OFFERS = 'subscriptionIntroductoryOffers',
    }
}

