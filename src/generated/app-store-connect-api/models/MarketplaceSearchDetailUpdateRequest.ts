/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MarketplaceSearchDetailUpdateRequest = {
    data: {
        type: MarketplaceSearchDetailUpdateRequest.type;
        id: string;
        attributes?: {
            catalogUrl?: string;
        };
    };
};
export namespace MarketplaceSearchDetailUpdateRequest {
    export enum type {
        MARKETPLACE_SEARCH_DETAILS = 'marketplaceSearchDetails',
    }
}

