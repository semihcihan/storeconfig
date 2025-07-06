/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type InAppPurchaseSubmission = {
    type: InAppPurchaseSubmission.type;
    id: string;
    relationships?: {
        inAppPurchaseV2?: {
            data?: {
                type: InAppPurchaseSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace InAppPurchaseSubmission {
    export enum type {
        IN_APP_PURCHASE_SUBMISSIONS = 'inAppPurchaseSubmissions',
    }
}

