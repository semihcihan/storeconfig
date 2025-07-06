/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionGroupLocalization = {
    type: SubscriptionGroupLocalization.type;
    id: string;
    attributes?: {
        name?: string;
        customAppName?: string;
        locale?: string;
        state?: SubscriptionGroupLocalization.state;
    };
    relationships?: {
        subscriptionGroup?: {
            data?: {
                type: SubscriptionGroupLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionGroupLocalization {
    export enum type {
        SUBSCRIPTION_GROUP_LOCALIZATIONS = 'subscriptionGroupLocalizations',
    }
    export enum state {
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

