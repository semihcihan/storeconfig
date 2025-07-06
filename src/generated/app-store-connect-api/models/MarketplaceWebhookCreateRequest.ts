/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MarketplaceWebhookCreateRequest = {
    data: {
        type: MarketplaceWebhookCreateRequest.type;
        attributes: {
            endpointUrl: string;
            secret: string;
        };
    };
};
export namespace MarketplaceWebhookCreateRequest {
    export enum type {
        MARKETPLACE_WEBHOOKS = 'marketplaceWebhooks',
    }
}

