/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseV2UpdateRequest = {
    data: {
        type: InAppPurchaseV2UpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            reviewNote?: string;
            familySharable?: boolean;
        };
    };
};
export namespace InAppPurchaseV2UpdateRequest {
    export enum type {
        IN_APP_PURCHASES = 'inAppPurchases',
    }
}

