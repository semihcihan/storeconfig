/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionIntroductoryOfferUpdateRequest = {
    data: {
        type: SubscriptionIntroductoryOfferUpdateRequest.type;
        id: string;
        attributes?: {
            endDate?: string;
        };
    };
};
export namespace SubscriptionIntroductoryOfferUpdateRequest {
    export enum type {
        SUBSCRIPTION_INTRODUCTORY_OFFERS = 'subscriptionIntroductoryOffers',
    }
}

