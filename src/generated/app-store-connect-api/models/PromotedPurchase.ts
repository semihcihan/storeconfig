/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type PromotedPurchase = {
    type: PromotedPurchase.type;
    id: string;
    attributes?: {
        visibleForAllUsers?: boolean;
        enabled?: boolean;
        state?: PromotedPurchase.state;
    };
    relationships?: {
        inAppPurchaseV2?: {
            data?: {
                type: PromotedPurchase.type;
                id: string;
            };
        };
        subscription?: {
            data?: {
                type: PromotedPurchase.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace PromotedPurchase {
    export enum type {
        PROMOTED_PURCHASES = 'promotedPurchases',
    }
    export enum state {
        APPROVED = 'APPROVED',
        IN_REVIEW = 'IN_REVIEW',
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        REJECTED = 'REJECTED',
    }
}

