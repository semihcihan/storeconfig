/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchasePriceInlineCreate = {
    type: InAppPurchasePriceInlineCreate.type;
    id?: string;
    attributes?: {
        startDate?: string;
        endDate?: string;
    };
    relationships?: {
        inAppPurchaseV2?: {
            data?: {
                type: InAppPurchasePriceInlineCreate.type;
                id: string;
            };
        };
        inAppPurchasePricePoint?: {
            data?: {
                type: InAppPurchasePriceInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace InAppPurchasePriceInlineCreate {
    export enum type {
        IN_APP_PURCHASE_PRICES = 'inAppPurchasePrices',
    }
}

