/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionPricePoint = {
    type: SubscriptionPricePoint.type;
    id: string;
    attributes?: {
        customerPrice?: string;
        proceeds?: string;
        proceedsYear2?: string;
    };
    relationships?: {
        territory?: {
            data?: {
                type: SubscriptionPricePoint.type;
                id: string;
            };
        };
        equalizations?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionPricePoint {
    export enum type {
        SUBSCRIPTION_PRICE_POINTS = 'subscriptionPricePoints',
    }
}

