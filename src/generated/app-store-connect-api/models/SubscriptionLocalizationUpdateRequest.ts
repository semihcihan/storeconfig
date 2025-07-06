/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionLocalizationUpdateRequest = {
    data: {
        type: SubscriptionLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            description?: string;
        };
    };
};
export namespace SubscriptionLocalizationUpdateRequest {
    export enum type {
        SUBSCRIPTION_LOCALIZATIONS = 'subscriptionLocalizations',
    }
}

