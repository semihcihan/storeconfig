/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PromotedPurchaseUpdateRequest = {
    data: {
        type: PromotedPurchaseUpdateRequest.type;
        id: string;
        attributes?: {
            visibleForAllUsers?: boolean;
            enabled?: boolean;
        };
    };
};
export namespace PromotedPurchaseUpdateRequest {
    export enum type {
        PROMOTED_PURCHASES = 'promotedPurchases',
    }
}

