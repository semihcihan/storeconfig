/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionOfferCodeOneTimeUseCodeUpdateRequest = {
    data: {
        type: SubscriptionOfferCodeOneTimeUseCodeUpdateRequest.type;
        id: string;
        attributes?: {
            active?: boolean;
        };
    };
};
export namespace SubscriptionOfferCodeOneTimeUseCodeUpdateRequest {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_ONE_TIME_USE_CODES = 'subscriptionOfferCodeOneTimeUseCodes',
    }
}

