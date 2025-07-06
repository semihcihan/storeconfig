/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionAvailabilityCreateRequest = {
    data: {
        type: SubscriptionAvailabilityCreateRequest.type;
        attributes: {
            availableInNewTerritories: boolean;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionAvailabilityCreateRequest.type;
                    id: string;
                };
            };
            availableTerritories: {
                data: Array<{
                    type: 'territories';
                    id: string;
                }>;
            };
        };
    };
};
export namespace SubscriptionAvailabilityCreateRequest {
    export enum type {
        SUBSCRIPTION_AVAILABILITIES = 'subscriptionAvailabilities',
    }
}

