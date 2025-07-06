/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionIntroductoryOfferInlineCreate } from './SubscriptionIntroductoryOfferInlineCreate';
import type { SubscriptionPriceInlineCreate } from './SubscriptionPriceInlineCreate';
import type { SubscriptionPromotionalOfferInlineCreate } from './SubscriptionPromotionalOfferInlineCreate';
export type SubscriptionUpdateRequest = {
    data: {
        type: SubscriptionUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            familySharable?: boolean;
            subscriptionPeriod?: SubscriptionUpdateRequest.subscriptionPeriod;
            reviewNote?: string;
            groupLevel?: number;
        };
        relationships?: {
            introductoryOffers?: {
                data?: Array<{
                    type: 'subscriptionIntroductoryOffers';
                    id: string;
                }>;
            };
            promotionalOffers?: {
                data?: Array<{
                    type: 'subscriptionPromotionalOffers';
                    id: string;
                }>;
            };
            prices?: {
                data?: Array<{
                    type: 'subscriptionPrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<(SubscriptionPromotionalOfferInlineCreate | SubscriptionPriceInlineCreate | SubscriptionIntroductoryOfferInlineCreate)>;
};
export namespace SubscriptionUpdateRequest {
    export enum type {
        SUBSCRIPTIONS = 'subscriptions',
    }
    export enum subscriptionPeriod {
        ONE_WEEK = 'ONE_WEEK',
        ONE_MONTH = 'ONE_MONTH',
        TWO_MONTHS = 'TWO_MONTHS',
        THREE_MONTHS = 'THREE_MONTHS',
        SIX_MONTHS = 'SIX_MONTHS',
        ONE_YEAR = 'ONE_YEAR',
    }
}

