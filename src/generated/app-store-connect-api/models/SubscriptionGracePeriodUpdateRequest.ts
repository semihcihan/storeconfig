/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionGracePeriodDuration } from './SubscriptionGracePeriodDuration';
export type SubscriptionGracePeriodUpdateRequest = {
    data: {
        type: SubscriptionGracePeriodUpdateRequest.type;
        id: string;
        attributes?: {
            optIn?: boolean;
            sandboxOptIn?: boolean;
            duration?: SubscriptionGracePeriodDuration;
            renewalType?: SubscriptionGracePeriodUpdateRequest.renewalType;
        };
    };
};
export namespace SubscriptionGracePeriodUpdateRequest {
    export enum type {
        SUBSCRIPTION_GRACE_PERIODS = 'subscriptionGracePeriods',
    }
    export enum renewalType {
        ALL_RENEWALS = 'ALL_RENEWALS',
        PAID_TO_PAID_ONLY = 'PAID_TO_PAID_ONLY',
    }
}

