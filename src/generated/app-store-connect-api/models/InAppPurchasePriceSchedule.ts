/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchasePriceSchedule = {
    type: InAppPurchasePriceSchedule.type;
    id: string;
    relationships?: {
        baseTerritory?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchasePriceSchedule.type;
                id: string;
            };
        };
        manualPrices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchasePrices';
                id: string;
            }>;
        };
        automaticPrices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchasePrices';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchasePriceSchedule {
    export enum type {
        IN_APP_PURCHASE_PRICE_SCHEDULES = 'inAppPurchasePriceSchedules',
    }
}

