/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionSubmissionCreateRequest = {
    data: {
        type: SubscriptionSubmissionCreateRequest.type;
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionSubmissionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionSubmissionCreateRequest {
    export enum type {
        SUBSCRIPTION_SUBMISSIONS = 'subscriptionSubmissions',
    }
}

