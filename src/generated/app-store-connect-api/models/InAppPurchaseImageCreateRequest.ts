/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseImageCreateRequest = {
    data: {
        type: InAppPurchaseImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            inAppPurchase: {
                data: {
                    type: InAppPurchaseImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace InAppPurchaseImageCreateRequest {
    export enum type {
        IN_APP_PURCHASE_IMAGES = 'inAppPurchaseImages',
    }
}

