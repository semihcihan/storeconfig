/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppMarketplaceSearchDetailLinkageResponse = {
    data: {
        type: AppMarketplaceSearchDetailLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppMarketplaceSearchDetailLinkageResponse {
    export enum type {
        MARKETPLACE_SEARCH_DETAILS = 'marketplaceSearchDetails',
    }
}

