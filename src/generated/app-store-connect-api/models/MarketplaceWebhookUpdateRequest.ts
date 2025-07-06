/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MarketplaceWebhookUpdateRequest = {
    data: {
        type: MarketplaceWebhookUpdateRequest.type;
        id: string;
        attributes?: {
            endpointUrl?: string;
            secret?: string;
        };
    };
};
export namespace MarketplaceWebhookUpdateRequest {
    export enum type {
        MARKETPLACE_WEBHOOKS = 'marketplaceWebhooks',
    }
}

