/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchasePriceInlineCreate } from './InAppPurchasePriceInlineCreate';
import type { TerritoryInlineCreate } from './TerritoryInlineCreate';
export type InAppPurchasePriceScheduleCreateRequest = {
    data: {
        type: InAppPurchasePriceScheduleCreateRequest.type;
        relationships: {
            inAppPurchase: {
                data: {
                    type: InAppPurchasePriceScheduleCreateRequest.type;
                    id: string;
                };
            };
            baseTerritory: {
                data: {
                    type: InAppPurchasePriceScheduleCreateRequest.type;
                    id: string;
                };
            };
            manualPrices: {
                data: Array<{
                    type: 'inAppPurchasePrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<(InAppPurchasePriceInlineCreate | TerritoryInlineCreate)>;
};
export namespace InAppPurchasePriceScheduleCreateRequest {
    export enum type {
        IN_APP_PURCHASE_PRICE_SCHEDULES = 'inAppPurchasePriceSchedules',
    }
}

