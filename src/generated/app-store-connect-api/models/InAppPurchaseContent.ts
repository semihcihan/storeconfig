/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchaseContent = {
    type: InAppPurchaseContent.type;
    id: string;
    attributes?: {
        fileName?: string;
        fileSize?: number;
        url?: string;
        lastModifiedDate?: string;
    };
    relationships?: {
        inAppPurchaseV2?: {
            data?: {
                type: InAppPurchaseContent.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseContent {
    export enum type {
        IN_APP_PURCHASE_CONTENTS = 'inAppPurchaseContents',
    }
}

