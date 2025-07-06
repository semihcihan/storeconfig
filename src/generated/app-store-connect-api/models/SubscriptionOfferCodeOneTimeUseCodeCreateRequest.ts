/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionOfferCodeOneTimeUseCodeCreateRequest = {
    data: {
        type: SubscriptionOfferCodeOneTimeUseCodeCreateRequest.type;
        attributes: {
            numberOfCodes: number;
            expirationDate: string;
        };
        relationships: {
            offerCode: {
                data: {
                    type: SubscriptionOfferCodeOneTimeUseCodeCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace SubscriptionOfferCodeOneTimeUseCodeCreateRequest {
    export enum type {
        SUBSCRIPTION_OFFER_CODE_ONE_TIME_USE_CODES = 'subscriptionOfferCodeOneTimeUseCodes',
    }
}

