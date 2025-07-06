/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type SubscriptionSubscriptionAvailabilityLinkageResponse = {
    data: {
        type: SubscriptionSubscriptionAvailabilityLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace SubscriptionSubscriptionAvailabilityLinkageResponse {
    export enum type {
        SUBSCRIPTION_AVAILABILITIES = 'subscriptionAvailabilities',
    }
}

