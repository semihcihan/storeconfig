/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionOfferCodeCustomCodeCreateRequest = {
    data: {
        type: SubscriptionOfferCodeCustomCodeCreateRequest.type;
        attributes: {
            customCode: string;
            numberOfCodes: number;
            expirationDate?: string;
        };
        relationships: {
            offerCode: {
                data: {
                    type: SubscriptionOfferCodeCustomCodeCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionOfferCodeCustomCodeCreateRequest {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_CUSTOM_CODES = 'subscriptionOfferCodeCustomCodes',
    }
}

