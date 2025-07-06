/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionCreateRequest = {
    data: {
        type: SubscriptionCreateRequest.type;
        attributes: {
            name: string;
            productId: string;
            familySharable?: boolean;
            subscriptionPeriod?: SubscriptionCreateRequest.subscriptionPeriod;
            reviewNote?: string;
            groupLevel?: number;
        };
        relationships: {
            group: {
                data: {
                    type: SubscriptionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionCreateRequest {
    export enum type {
        SUBSCRIPTIONS = 'subscriptions',
    }
    export enum subscriptionPeriod {
        ONE_WEEK = 'ONE_WEEK',
        ONE_MONTH = 'ONE_MONTH',
        TWO_MONTHS = 'TWO_MONTHS',
        THREE_MONTHS = 'THREE_MONTHS',
        SIX_MONTHS = 'SIX_MONTHS',
        ONE_YEAR = 'ONE_YEAR',
    }
}

