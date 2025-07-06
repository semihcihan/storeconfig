/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { ResourceLinks } from './ResourceLinks';
/**
 * @deprecated
 */
export type InAppPurchase = {
    type: InAppPurchase.type;
    id: string;
    attributes?: {
        referenceName?: string;
        productId?: string;
        inAppPurchaseType?: InAppPurchase.inAppPurchaseType;
        state?: InAppPurchase.state;
    };
    relationships?: {
        apps?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'apps';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchase {
    export enum type {
        IN_APP_PURCHASES = 'inAppPurchases',
    }
    export enum inAppPurchaseType {
        AUTOMATICALLY_RENEWABLE_SUBSCRIPTION = 'AUTOMATICALLY_RENEWABLE_SUBSCRIPTION',
        NON_CONSUMABLE = 'NON_CONSUMABLE',
        CONSUMABLE = 'CONSUMABLE',
        NON_RENEWING_SUBSCRIPTION = 'NON_RENEWING_SUBSCRIPTION',
        FREE_SUBSCRIPTION = 'FREE_SUBSCRIPTION',
    }
    export enum state {
        CREATED = 'CREATED',
        DEVELOPER_SIGNED_OFF = 'DEVELOPER_SIGNED_OFF',
        DEVELOPER_ACTION_NEEDED = 'DEVELOPER_ACTION_NEEDED',
        DELETION_IN_PROGRESS = 'DELETION_IN_PROGRESS',
        APPROVED = 'APPROVED',
        DELETED = 'DELETED',
        REMOVED_FROM_SALE = 'REMOVED_FROM_SALE',
        DEVELOPER_REMOVED_FROM_SALE = 'DEVELOPER_REMOVED_FROM_SALE',
        WAITING_FOR_UPLOAD = 'WAITING_FOR_UPLOAD',
        PROCESSING_CONTENT = 'PROCESSING_CONTENT',
        REPLACED = 'REPLACED',
        REJECTED = 'REJECTED',
        WAITING_FOR_SCREENSHOT = 'WAITING_FOR_SCREENSHOT',
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        MISSING_METADATA = 'MISSING_METADATA',
        READY_TO_SUBMIT = 'READY_TO_SUBMIT',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        PENDING_DEVELOPER_RELEASE = 'PENDING_DEVELOPER_RELEASE',
    }
}

