/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseImageUpdateRequest = {
    data: {
        type: InAppPurchaseImageUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace InAppPurchaseImageUpdateRequest {
    export enum type {
        IN_APP_PURCHASE_IMAGES = 'inAppPurchaseImages',
    }
}

