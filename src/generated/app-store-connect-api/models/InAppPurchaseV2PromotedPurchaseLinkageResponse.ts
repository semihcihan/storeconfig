/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type InAppPurchaseV2PromotedPurchaseLinkageResponse = {
    data: {
        type: InAppPurchaseV2PromotedPurchaseLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace InAppPurchaseV2PromotedPurchaseLinkageResponse {
    export enum type {
        PROMOTED_PURCHASES = 'promotedPurchases',
    }
}

