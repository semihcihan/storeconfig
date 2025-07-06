/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { WebhookDelivery } from './WebhookDelivery';
import type { WebhookEvent } from './WebhookEvent';
export type WebhookDeliveryResponse = {
    data: WebhookDelivery;
    included?: Array<WebhookEvent>;
    links: DocumentLinks;
};

