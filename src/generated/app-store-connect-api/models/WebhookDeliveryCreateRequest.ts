/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookDeliveryCreateRequest = {
    data: {
        type: WebhookDeliveryCreateRequest.type;
        relationships: {
            template: {
                data: {
                    type: WebhookDeliveryCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace WebhookDeliveryCreateRequest {
    export enum type {
        WEBHOOK_DELIVERIES = 'webhookDeliveries',
    }
}

