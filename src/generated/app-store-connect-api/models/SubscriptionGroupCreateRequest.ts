/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionGroupCreateRequest = {
    data: {
        type: SubscriptionGroupCreateRequest.type;
        attributes: {
            referenceName: string;
        };
        relationships: {
            app: {
                data: {
                    type: SubscriptionGroupCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionGroupCreateRequest {
    export enum type {
        SUBSCRIPTION_GROUPS = 'subscriptionGroups',
    }
}

