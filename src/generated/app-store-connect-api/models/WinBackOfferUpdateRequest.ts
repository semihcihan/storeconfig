/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntegerRange } from './IntegerRange';
export type WinBackOfferUpdateRequest = {
    data: {
        type: WinBackOfferUpdateRequest.type;
        id: string;
        attributes?: {
            customerEligibilityPaidSubscriptionDurationInMonths?: number;
            customerEligibilityTimeSinceLastSubscribedInMonths?: IntegerRange;
            customerEligibilityWaitBetweenOffersInMonths?: number;
            startDate?: string;
            endDate?: string;
            priority?: WinBackOfferUpdateRequest.priority;
            promotionIntent?: WinBackOfferUpdateRequest.promotionIntent;
        };
    };
};
export namespace WinBackOfferUpdateRequest {
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

