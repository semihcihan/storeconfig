/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppSubscriptionGracePeriodLinkageResponse = {
    data: {
        type: AppSubscriptionGracePeriodLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppSubscriptionGracePeriodLinkageResponse {
    export enum type {
        SUBSCRIPTION_GRACE_PERIODS = 'subscriptionGracePeriods',
    }
}

