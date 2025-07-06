/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionGroup = {
    type: SubscriptionGroup.type;
    id: string;
    attributes?: {
        referenceName?: string;
    };
    relationships?: {
        subscriptions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptions';
                id: string;
            }>;
        };
        subscriptionGroupLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionGroupLocalizations';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionGroup {
    export enum type {
        SUBSCRIPTION_GROUPS = 'subscriptionGroups',
    }
}

