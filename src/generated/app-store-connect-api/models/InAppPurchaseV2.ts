/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseState } from './InAppPurchaseState';
import type { InAppPurchaseType } from './InAppPurchaseType';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchaseV2 = {
    type: InAppPurchaseV2.type;
    id: string;
    attributes?: {
        name?: string;
        productId?: string;
        inAppPurchaseType?: InAppPurchaseType;
        state?: InAppPurchaseState;
        reviewNote?: string;
        familySharable?: boolean;
        contentHosting?: boolean;
    };
    relationships?: {
        inAppPurchaseLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchaseLocalizations';
                id: string;
            }>;
        };
        pricePoints?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchasePricePoints';
                id: string;
            }>;
        };
        content?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchaseV2.type;
                id: string;
            };
        };
        appStoreReviewScreenshot?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchaseV2.type;
                id: string;
            };
        };
        promotedPurchase?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchaseV2.type;
                id: string;
            };
        };
        iapPriceSchedule?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchaseV2.type;
                id: string;
            };
        };
        inAppPurchaseAvailability?: {
            links?: RelationshipLinks;
            data?: {
                type: InAppPurchaseV2.type;
                id: string;
            };
        };
        images?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchaseImages';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseV2 {
    export enum type {
        IN_APP_PURCHASES = 'inAppPurchases',
    }
}

