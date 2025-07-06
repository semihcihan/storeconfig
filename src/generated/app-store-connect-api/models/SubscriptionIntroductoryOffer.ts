/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionIntroductoryOffer = {
    type: SubscriptionIntroductoryOffer.type;
    id: string;
    attributes?: {
        startDate?: string;
        endDate?: string;
        duration?: SubscriptionOfferDuration;
        offerMode?: SubscriptionOfferMode;
        numberOfPeriods?: number;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionIntroductoryOffer.type;
                id: string;
            };
        };
        territory?: {
            data?: {
                type: SubscriptionIntroductoryOffer.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionIntroductoryOffer.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionIntroductoryOffer {
    export enum type {
        SUBSCRIPTION_INTRODUCTORY_OFFERS = 'subscriptionIntroductoryOffers',
    }
}

