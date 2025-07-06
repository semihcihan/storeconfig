/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionGracePeriodDuration } from './SubscriptionGracePeriodDuration';
export type SubscriptionGracePeriod = {
    type: SubscriptionGracePeriod.type;
    id: string;
    attributes?: {
        optIn?: boolean;
        sandboxOptIn?: boolean;
        duration?: SubscriptionGracePeriodDuration;
        renewalType?: SubscriptionGracePeriod.renewalType;
    };
    links?: ResourceLinks;
};
export namespace SubscriptionGracePeriod {
    export enum type {
        SUBSCRIPTION_GRACE_PERIODS = 'subscriptionGracePeriods',
    }
    export enum renewalType {
        ALL_RENEWALS = 'ALL_RENEWALS',
        PAID_TO_PAID_ONLY = 'PAID_TO_PAID_ONLY',
    }
}

