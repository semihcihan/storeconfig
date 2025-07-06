/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type SubscriptionSubmission = {
    type: SubscriptionSubmission.type;
    id: string;
    relationships?: {
        subscription?: {
            data?: {
                type: SubscriptionSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace SubscriptionSubmission {
    export enum type {
        SUBSCRIPTION_SUBMISSIONS = 'subscriptionSubmissions',
    }
}

