/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookCreateRequest } from '../models/WebhookCreateRequest';
import type { WebhookDeliveriesLinkagesResponse } from '../models/WebhookDeliveriesLinkagesResponse';
import type { WebhookDeliveriesResponse } from '../models/WebhookDeliveriesResponse';
import type { WebhookResponse } from '../models/WebhookResponse';
import type { WebhookUpdateRequest } from '../models/WebhookUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhooksService {
    /**
     * @param requestBody Webhook representation
     * @returns WebhookResponse Single Webhook
     * @throws ApiError
     */
    public static webhooksCreateInstance(
        requestBody: WebhookCreateRequest,
    ): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/webhooks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param fieldsWebhooks the fields to include for returned resources of type webhooks
     * @param include comma-separated list of relationships to include
     * @returns WebhookResponse Single Webhook
     * @throws ApiError
     */
    public static webhooksGetInstance(
        id: string,
        fieldsWebhooks?: Array<'enabled' | 'eventTypes' | 'name' | 'url' | 'app' | 'deliveries'>,
        include?: Array<'app'>,
    ): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/webhooks/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[webhooks]': fieldsWebhooks,
                'include': include,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param requestBody Webhook representation
     * @returns WebhookResponse Single Webhook
     * @throws ApiError
     */
    public static webhooksUpdateInstance(
        id: string,
        requestBody: WebhookUpdateRequest,
    ): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/webhooks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static webhooksDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns WebhookDeliveriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static webhooksDeliveriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<WebhookDeliveriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/webhooks/{id}/relationships/deliveries',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param filterDeliveryState filter by attribute 'deliveryState'
     * @param filterCreatedDateGreaterThanOrEqualTo filter by createdDateGreaterThanOrEqualTo
     * @param filterCreatedDateLessThan filter by createdDateLessThan
     * @param fieldsWebhookDeliveries the fields to include for returned resources of type webhookDeliveries
     * @param fieldsWebhookEvents the fields to include for returned resources of type webhookEvents
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns WebhookDeliveriesResponse List of WebhookDeliveries
     * @throws ApiError
     */
    public static webhooksDeliveriesGetToManyRelated(
        id: string,
        filterDeliveryState?: Array<'SUCCEEDED' | 'FAILED' | 'PENDING'>,
        filterCreatedDateGreaterThanOrEqualTo?: Array<string>,
        filterCreatedDateLessThan?: Array<string>,
        fieldsWebhookDeliveries?: Array<'createdDate' | 'deliveryState' | 'errorMessage' | 'redelivery' | 'sentDate' | 'request' | 'response' | 'event'>,
        fieldsWebhookEvents?: Array<'eventType' | 'payload' | 'ping' | 'createdDate'>,
        limit?: number,
        include?: Array<'event'>,
    ): CancelablePromise<WebhookDeliveriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/webhooks/{id}/deliveries',
            path: {
                'id': id,
            },
            query: {
                'filter[deliveryState]': filterDeliveryState,
                'filter[createdDateGreaterThanOrEqualTo]': filterCreatedDateGreaterThanOrEqualTo,
                'filter[createdDateLessThan]': filterCreatedDateLessThan,
                'fields[webhookDeliveries]': fieldsWebhookDeliveries,
                'fields[webhookEvents]': fieldsWebhookEvents,
                'limit': limit,
                'include': include,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
