/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type WebhookDelivery = {
    type: WebhookDelivery.type;
    id: string;
    attributes?: {
        createdDate?: string;
        deliveryState?: WebhookDelivery.deliveryState;
        errorMessage?: string;
        redelivery?: boolean;
        sentDate?: string;
        request?: {
            url?: string;
        };
        response?: {
            httpStatusCode?: number;
            body?: string;
        };
    };
    relationships?: {
        event?: {
            data?: {
                type: WebhookDelivery.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace WebhookDelivery {
    export enum type {
        WEBHOOK_DELIVERIES = 'webhookDeliveries',
    }
    export enum deliveryState {
        SUCCEEDED = 'SUCCEEDED',
        FAILED = 'FAILED',
        PENDING = 'PENDING',
    }
}

