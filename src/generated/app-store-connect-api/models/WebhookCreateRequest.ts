/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookEventType } from './WebhookEventType';
export type WebhookCreateRequest = {
    data: {
        type: WebhookCreateRequest.type;
        attributes: {
            enabled: boolean;
            eventTypes: Array<WebhookEventType>;
            name: string;
            secret: string;
            url: string;
        };
        relationships: {
            app: {
                data: {
                    type: WebhookCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace WebhookCreateRequest {
    export enum type {
        WEBHOOKS = 'webhooks',
    }
}

