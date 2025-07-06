/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerReviewResponseV1CreateRequest = {
    data: {
        type: CustomerReviewResponseV1CreateRequest.type;
        attributes: {
            responseBody: string;
        };
        relationships: {
            review: {
                data: {
                    type: CustomerReviewResponseV1CreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace CustomerReviewResponseV1CreateRequest {
    export enum type {
        CUSTOMER_REVIEW_RESPONSES = 'customerReviewResponses',
    }
}

