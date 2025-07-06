/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionOfferCodeOneTimeUseCode = {
    type: SubscriptionOfferCodeOneTimeUseCode.type;
    id: string;
    attributes?: {
        numberOfCodes?: number;
        createdDate?: string;
        expirationDate?: string;
        active?: boolean;
    };
    relationships?: {
        offerCode?: {
            data?: {
                type: SubscriptionOfferCodeOneTimeUseCode.type;
                id: string;
            };
        };
        values?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionOfferCodeOneTimeUseCode {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_ONE_TIME_USE_CODES = 'subscriptionOfferCodeOneTimeUseCodes',
    }
}

