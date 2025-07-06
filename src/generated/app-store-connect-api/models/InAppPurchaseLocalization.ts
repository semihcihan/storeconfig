/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchaseLocalization = {
    type: InAppPurchaseLocalization.type;
    id: string;
    attributes?: {
        name?: string;
        locale?: string;
        description?: string;
        state?: InAppPurchaseLocalization.state;
    };
    relationships?: {
        inAppPurchaseV2?: {
            data?: {
                type: InAppPurchaseLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseLocalization {
    export enum type {
        IN_APP_PURCHASE_LOCALIZATIONS = 'inAppPurchaseLocalizations',
    }
    export enum state {
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

