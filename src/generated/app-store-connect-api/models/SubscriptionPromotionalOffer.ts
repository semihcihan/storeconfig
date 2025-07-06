/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionPromotionalOffer = {
    type: SubscriptionPromotionalOffer.type;
    id: string;
    attributes?: {
        duration?: SubscriptionOfferDuration;
        name?: string;
        numberOfPeriods?: number;
        offerCode?: string;
        offerMode?: SubscriptionOfferMode;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionPromotionalOffer.type;
                id: string;
            };
        };
        prices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionPromotionalOfferPrices';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionPromotionalOffer {
    export enum type {
        SUBSCRIPTION_PROMOTIONAL_OFFERS = 'subscriptionPromotionalOffers',
    }
}

