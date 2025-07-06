/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionGroupLocalizationUpdateRequest = {
    data: {
        type: SubscriptionGroupLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            customAppName?: string;
        };
    };
};
export namespace SubscriptionGroupLocalizationUpdateRequest {
    export enum type {
        SUBSCRIPTION_GROUP_LOCALIZATIONS = 'subscriptionGroupLocalizations',
    }
}

