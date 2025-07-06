/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionGroupSubmissionCreateRequest = {
    data: {
        type: SubscriptionGroupSubmissionCreateRequest.type;
        relationships: {
            subscriptionGroup: {
                data: {
                    type: SubscriptionGroupSubmissionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionGroupSubmissionCreateRequest {
    export enum type {
        SUBSCRIPTION_GROUP_SUBMISSIONS = 'subscriptionGroupSubmissions',
    }
}

