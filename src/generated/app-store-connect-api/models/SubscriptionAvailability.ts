/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionAvailability = {
    type: SubscriptionAvailability.type;
    id: string;
    attributes?: {
        availableInNewTerritories?: boolean;
    };
    relationships?: {
        availableTerritories?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'territories';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionAvailability {
    export enum type {
        SUBSCRIPTION_AVAILABILITIES = 'subscriptionAvailabilities',
    }
}

