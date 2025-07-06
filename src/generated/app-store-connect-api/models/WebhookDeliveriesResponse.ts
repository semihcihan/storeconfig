/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { WebhookDelivery } from './WebhookDelivery';
import type { WebhookEvent } from './WebhookEvent';
export type WebhookDeliveriesResponse = {
    data: Array<WebhookDelivery>;
    included?: Array<WebhookEvent>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

