/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type WebhookPing = {
    type: WebhookPing.type;
    id: string;
    links?: ResourceLinks;
};
export namespace WebhookPing {
    export enum type {
        WEBHOOK_PINGS = 'webhookPings',
    }
}

