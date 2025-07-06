/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionLocalization = {
    type: SubscriptionLocalization.type;
    id: string;
    attributes?: {
        name?: string;
        locale?: string;
        description?: string;
        state?: SubscriptionLocalization.state;
    };
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionLocalization {
    export enum type {
        SUBSCRIPTION_LOCALIZATIONS = 'subscriptionLocalizations',
    }
    export enum state {
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

