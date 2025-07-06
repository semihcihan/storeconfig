/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionCustomerEligibility } from './SubscriptionCustomerEligibility';
import type { SubscriptionOfferDuration } from './SubscriptionOfferDuration';
import type { SubscriptionOfferEligibility } from './SubscriptionOfferEligibility';
import type { SubscriptionOfferMode } from './SubscriptionOfferMode';
export type SubscriptionOfferCode = {
    type: SubscriptionOfferCode.type;
    id: string;
    attributes?: {
        name?: string;
        customerEligibilities?: Array<SubscriptionCustomerEligibility>;
        offerEligibility?: SubscriptionOfferEligibility;
        duration?: SubscriptionOfferDuration;
        offerMode?: SubscriptionOfferMode;
        numberOfPeriods?: number;
        active?: boolean;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionOfferCode.type;
                id: string;
            };
        };
        oneTimeUseCodes?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionOfferCodeOneTimeUseCodes';
                id: string;
            }>;
        };
        customCodes?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionOfferCodeCustomCodes';
                id: string;
            }>;
        };
        prices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionOfferCodePrices';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionOfferCode {
    export enum type {
        SUBSCRIPTION_OFFER_CODES = 'subscriptionOfferCodes',
    }
}

