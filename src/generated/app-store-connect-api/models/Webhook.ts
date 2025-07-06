/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { WebhookEventType } from './WebhookEventType';
export type Webhook = {
    type: Webhook.type;
    id: string;
    attributes?: {
        enabled?: boolean;
        eventTypes?: Array<WebhookEventType>;
        name?: string;
        url?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: Webhook.type;
                id: string;
            };
        };
        deliveries?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace Webhook {
    export enum type {
        WEBHOOKS = 'webhooks',
    }
}

