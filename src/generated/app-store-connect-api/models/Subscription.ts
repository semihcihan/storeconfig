/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type Subscription = {
    type: Subscription.type;
    id: string;
    attributes?: {
        name?: string;
        productId?: string;
        familySharable?: boolean;
        state?: Subscription.state;
        subscriptionPeriod?: Subscription.subscriptionPeriod;
        reviewNote?: string;
        groupLevel?: number;
    };
    relationships?: {
        subscriptionLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionLocalizations';
                id: string;
            }>;
        };
        appStoreReviewScreenshot?: {
            links?: RelationshipLinks;
            data?: {
                type: Subscription.type;
                id: string;
            };
        };
        group?: {
            data?: {
                type: Subscription.type;
                id: string;
            };
        };
        introductoryOffers?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionIntroductoryOffers';
                id: string;
            }>;
        };
        promotionalOffers?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionPromotionalOffers';
                id: string;
            }>;
        };
        offerCodes?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionOfferCodes';
                id: string;
            }>;
        };
        prices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionPrices';
                id: string;
            }>;
        };
        pricePoints?: {
            links?: RelationshipLinks;
        };
        promotedPurchase?: {
            links?: RelationshipLinks;
            data?: {
                type: Subscription.type;
                id: string;
            };
        };
        subscriptionAvailability?: {
            links?: RelationshipLinks;
            data?: {
                type: Subscription.type;
                id: string;
            };
        };
        winBackOffers?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'winBackOffers';
                id: string;
            }>;
        };
        images?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionImages';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace Subscription {
    export enum type {
        SUBSCRIPTIONS = 'subscriptions',
    }
    export enum state {
        MISSING_METADATA = 'MISSING_METADATA',
        READY_TO_SUBMIT = 'READY_TO_SUBMIT',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        DEVELOPER_ACTION_NEEDED = 'DEVELOPER_ACTION_NEEDED',
        PENDING_BINARY_APPROVAL = 'PENDING_BINARY_APPROVAL',
        APPROVED = 'APPROVED',
        DEVELOPER_REMOVED_FROM_SALE = 'DEVELOPER_REMOVED_FROM_SALE',
        REMOVED_FROM_SALE = 'REMOVED_FROM_SALE',
        REJECTED = 'REJECTED',
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

