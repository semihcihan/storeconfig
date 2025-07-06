/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionGroupLocalizationCreateRequest = {
    data: {
        type: SubscriptionGroupLocalizationCreateRequest.type;
        attributes: {
            name: string;
            customAppName?: string;
            locale: string;
        };
        relationships: {
            subscriptionGroup: {
                data: {
                    type: SubscriptionGroupLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionGroupLocalizationCreateRequest {
    export enum type {
        SUBSCRIPTION_GROUP_LOCALIZATIONS = 'subscriptionGroupLocalizations',
    }
}

