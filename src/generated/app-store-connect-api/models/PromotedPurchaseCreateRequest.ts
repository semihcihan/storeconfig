/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PromotedPurchaseCreateRequest = {
    data: {
        type: PromotedPurchaseCreateRequest.type;
        attributes: {
            visibleForAllUsers: boolean;
            enabled?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: PromotedPurchaseCreateRequest.type;
                    id: string;
                };
            };
            inAppPurchaseV2?: {
                data?: {
                    type: PromotedPurchaseCreateRequest.type;
                    id: string;
                };
            };
            subscription?: {
                data?: {
                    type: PromotedPurchaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace PromotedPurchaseCreateRequest {
    export enum type {
        PROMOTED_PURCHASES = 'promotedPurchases',
    }
}

