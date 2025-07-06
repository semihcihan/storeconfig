/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type InAppPurchaseV2IapPriceScheduleLinkageResponse = {
    data: {
        type: InAppPurchaseV2IapPriceScheduleLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace InAppPurchaseV2IapPriceScheduleLinkageResponse {
    export enum type {
        IN_APP_PURCHASE_PRICE_SCHEDULES = 'inAppPurchasePriceSchedules',
    }
}

