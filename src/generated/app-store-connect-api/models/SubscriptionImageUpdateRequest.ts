/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionImageUpdateRequest = {
    data: {
        type: SubscriptionImageUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace SubscriptionImageUpdateRequest {
    export enum type {
        SUBSCRIPTION_IMAGES = 'subscriptionImages',
    }
}

