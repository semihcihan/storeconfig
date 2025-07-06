/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type MarketplaceWebhook = {
    type: MarketplaceWebhook.type;
    id: string;
    attributes?: {
        endpointUrl?: string;
    };
    links?: ResourceLinks;
};
export namespace MarketplaceWebhook {
    export enum type {
        MARKETPLACE_WEBHOOKS = 'marketplaceWebhooks',
    }
}

