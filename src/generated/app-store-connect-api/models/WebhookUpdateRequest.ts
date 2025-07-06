/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookEventType } from './WebhookEventType';
export type WebhookUpdateRequest = {
    data: {
        type: WebhookUpdateRequest.type;
        id: string;
        attributes?: {
            enabled?: boolean;
            eventTypes?: Array<WebhookEventType>;
            name?: string;
            secret?: string;
            url?: string;
        };
    };
};
export namespace WebhookUpdateRequest {
    export enum type {
        WEBHOOKS = 'webhooks',
    }
}

