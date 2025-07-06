/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionOfferCodeCustomCode = {
    type: SubscriptionOfferCodeCustomCode.type;
    id: string;
    attributes?: {
        customCode?: string;
        numberOfCodes?: number;
        createdDate?: string;
        expirationDate?: string;
        active?: boolean;
    };
    relationships?: {
        offerCode?: {
            data?: {
                type: SubscriptionOfferCodeCustomCode.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionOfferCodeCustomCode {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_CUSTOM_CODES = 'subscriptionOfferCodeCustomCodes',
    }
}

