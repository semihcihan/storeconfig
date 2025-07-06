/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionGroupUpdateRequest = {
    data: {
        type: SubscriptionGroupUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
        };
    };
};
export namespace SubscriptionGroupUpdateRequest {
    export enum type {
        SUBSCRIPTION_GROUPS = 'subscriptionGroups',
    }
}

