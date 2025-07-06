/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MarketplaceSearchDetailCreateRequest = {
    data: {
        type: MarketplaceSearchDetailCreateRequest.type;
        attributes: {
            catalogUrl: string;
        };
        relationships: {
            app: {
                data: {
                    type: MarketplaceSearchDetailCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace MarketplaceSearchDetailCreateRequest {
    export enum type {
        MARKETPLACE_SEARCH_DETAILS = 'marketplaceSearchDetails',
    }
}

