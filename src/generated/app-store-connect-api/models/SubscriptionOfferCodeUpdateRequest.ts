/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionOfferCodeUpdateRequest = {
    data: {
        type: SubscriptionOfferCodeUpdateRequest.type;
        id: string;
        attributes?: {
            active?: boolean;
        };
    };
};
export namespace SubscriptionOfferCodeUpdateRequest {
    export enum type {
        SUBSCRIPTION_OFFER_CODES = 'subscriptionOfferCodes',
    }
}

