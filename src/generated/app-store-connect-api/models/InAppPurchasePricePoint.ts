/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchasePricePoint = {
    type: InAppPurchasePricePoint.type;
    id: string;
    attributes?: {
        customerPrice?: string;
        proceeds?: string;
    };
    relationships?: {
        territory?: {
            data?: {
                type: InAppPurchasePricePoint.type;
                id: string;
            };
        };
        equalizations?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchasePricePoint {
    export enum type {
        IN_APP_PURCHASE_PRICE_POINTS = 'inAppPurchasePricePoints',
    }
}

