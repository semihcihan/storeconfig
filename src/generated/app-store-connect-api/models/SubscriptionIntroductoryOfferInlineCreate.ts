/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionIntroductoryOfferInlineCreate = {
    type: SubscriptionIntroductoryOfferInlineCreate.type;
    id?: string;
    attributes: {
        startDate?: string;
        endDate?: string;
        duration: SubscriptionOfferDuration;
        offerMode: SubscriptionOfferMode;
        numberOfPeriods: number;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionIntroductoryOfferInlineCreate.type;
                id: string;
            };
        };
        territory?: {
            data?: {
                type: SubscriptionIntroductoryOfferInlineCreate.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: SubscriptionIntroductoryOfferInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace SubscriptionIntroductoryOfferInlineCreate {
    export enum type {
        SUBSCRIPTION_INTRODUCTORY_OFFERS = 'subscriptionIntroductoryOffers',
    }
}

