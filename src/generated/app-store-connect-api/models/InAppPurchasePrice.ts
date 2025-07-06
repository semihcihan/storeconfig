/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchasePrice = {
    type: InAppPurchasePrice.type;
    id: string;
    attributes?: {
        startDate?: string;
        endDate?: string;
        manual?: boolean;
    };
    relationships?: {
        inAppPurchasePricePoint?: {
            data?: {
                type: InAppPurchasePrice.type;
                id: string;
            };
        };
        territory?: {
            data?: {
                type: InAppPurchasePrice.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchasePrice {
    export enum type {
        IN_APP_PURCHASE_PRICES = 'inAppPurchasePrices',
    }
}

