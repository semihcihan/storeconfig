/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseSubmissionCreateRequest = {
    data: {
        type: InAppPurchaseSubmissionCreateRequest.type;
        relationships: {
            inAppPurchaseV2: {
                data: {
                    type: InAppPurchaseSubmissionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace InAppPurchaseSubmissionCreateRequest {
    export enum type {
        IN_APP_PURCHASE_SUBMISSIONS = 'inAppPurchaseSubmissions',
    }
}

