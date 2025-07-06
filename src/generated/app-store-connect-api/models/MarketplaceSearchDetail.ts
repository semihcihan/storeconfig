/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type MarketplaceSearchDetail = {
    type: MarketplaceSearchDetail.type;
    id: string;
    attributes?: {
        catalogUrl?: string;
    };
    links?: ResourceLinks;
};
export namespace MarketplaceSearchDetail {
    export enum type {
        MARKETPLACE_SEARCH_DETAILS = 'marketplaceSearchDetails',
    }
}

