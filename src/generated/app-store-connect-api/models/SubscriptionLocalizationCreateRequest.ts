/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionLocalizationCreateRequest = {
    data: {
        type: SubscriptionLocalizationCreateRequest.type;
        attributes: {
            name: string;
            locale: string;
            description?: string;
        };
        relationships: {
            subscription: {
                data: {
                    type: SubscriptionLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionLocalizationCreateRequest {
    export enum type {
        SUBSCRIPTION_LOCALIZATIONS = 'subscriptionLocalizations',
    }
}

