/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntegerRange } from './IntegerRange';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
import type { WinBackOfferPriceInlineCreate } from './WinBackOfferPriceInlineCreate';
export type WinBackOfferCreateRequest = {
    data: {
        type: WinBackOfferCreateRequest.type;
        attributes: {
            referenceName: string;
            offerId: string;
            duration: SubscriptionOfferDuration;
            offerMode: SubscriptionOfferMode;
            periodCount: number;
            customerEligibilityPaidSubscriptionDurationInMonths: number;
            customerEligibilityTimeSinceLastSubscribedInMonths: IntegerRange;
            customerEligibilityWaitBetweenOffersInMonths?: number;
            startDate: string;
            endDate?: string;
            priority: WinBackOfferCreateRequest.priority;
            promotionIntent?: WinBackOfferCreateRequest.promotionIntent;
        };
        relationships: {
            subscription: {
                data: {
                    type: WinBackOfferCreateRequest.type;
                    id: string;
                };
            };
            prices: {
                data: Array<{
                    type: 'winBackOfferPrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<WinBackOfferPriceInlineCreate>;
};
export namespace WinBackOfferCreateRequest {
    export enum type {
        WIN_BACK_OFFERS = 'winBackOffers',
    }
    export enum priority {
        HIGH = 'HIGH',
        NORMAL = 'NORMAL',
    }
    export enum promotionIntent {
        NOT_PROMOTED = 'NOT_PROMOTED',
        USE_AUTO_GENERATED_ASSETS = 'USE_AUTO_GENERATED_ASSETS',
    }
}

