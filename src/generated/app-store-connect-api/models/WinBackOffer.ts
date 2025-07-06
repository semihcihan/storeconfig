/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntegerRange } from './IntegerRange';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type WinBackOffer = {
    type: WinBackOffer.type;
    id: string;
    attributes?: {
        referenceName?: string;
        offerId?: string;
        duration?: SubscriptionOfferDuration;
        offerMode?: SubscriptionOfferMode;
        periodCount?: number;
        customerEligibilityPaidSubscriptionDurationInMonths?: number;
        customerEligibilityTimeSinceLastSubscribedInMonths?: IntegerRange;
        customerEligibilityWaitBetweenOffersInMonths?: number;
        startDate?: string;
        endDate?: string;
        priority?: WinBackOffer.priority;
        promotionIntent?: WinBackOffer.promotionIntent;
    };
    relationships?: {
        prices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'winBackOfferPrices';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace WinBackOffer {
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

