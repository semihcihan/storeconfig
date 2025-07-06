/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseType } from './InAppPurchaseType';
export type InAppPurchaseV2CreateRequest = {
    data: {
        type: InAppPurchaseV2CreateRequest.type;
        attributes: {
            name: string;
            productId: string;
            inAppPurchaseType: InAppPurchaseType;
            reviewNote?: string;
            familySharable?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: InAppPurchaseV2CreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace InAppPurchaseV2CreateRequest {
    export enum type {
        IN_APP_PURCHASES = 'inAppPurchases',
    }
}

