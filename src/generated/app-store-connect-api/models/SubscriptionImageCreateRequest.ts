/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionImageCreateRequest = {
    data: {
        type: SubscriptionImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionImageCreateRequest {
    export enum type {
        SUBSCRIPTION_IMAGES = 'subscriptionImages',
    }
}

