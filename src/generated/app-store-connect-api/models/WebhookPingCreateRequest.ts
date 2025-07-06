/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookPingCreateRequest = {
    data: {
        type: WebhookPingCreateRequest.type;
        relationships: {
            webhook: {
                data: {
                    type: WebhookPingCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace WebhookPingCreateRequest {
    export enum type {
        WEBHOOK_PINGS = 'webhookPings',
    }
}

