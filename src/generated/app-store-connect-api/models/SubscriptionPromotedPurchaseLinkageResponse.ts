/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type SubscriptionPromotedPurchaseLinkageResponse = {
    data: {
        type: SubscriptionPromotedPurchaseLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace SubscriptionPromotedPurchaseLinkageResponse {
    export enum type {
        PROMOTED_PURCHASES = 'promotedPurchases',
    }
}

