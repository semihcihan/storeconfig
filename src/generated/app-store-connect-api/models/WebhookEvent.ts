/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
import type { WebhookEventType } from './WebhookEventType';
export type WebhookEvent = {
    type: WebhookEvent.type;
    id: string;
    attributes?: {
        eventType?: WebhookEventType;
        payload?: string;
        ping?: boolean;
        createdDate?: string;
    };
    links?: ResourceLinks;
};
export namespace WebhookEvent {
    export enum type {
        WEBHOOK_EVENTS = 'webhookEvents',
    }
}

