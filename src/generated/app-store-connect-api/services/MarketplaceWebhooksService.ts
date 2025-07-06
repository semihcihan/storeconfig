/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceWebhookCreateRequest } from '../models/MarketplaceWebhookCreateRequest';
import type { MarketplaceWebhookResponse } from '../models/MarketplaceWebhookResponse';
import type { MarketplaceWebhooksResponse } from '../models/MarketplaceWebhooksResponse';
import type { MarketplaceWebhookUpdateRequest } from '../models/MarketplaceWebhookUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MarketplaceWebhooksService {
    /**
     * @param fieldsMarketplaceWebhooks the fields to include for returned resources of type marketplaceWebhooks
     * @param limit maximum resources per page
     * @returns MarketplaceWebhooksResponse List of MarketplaceWebhooks
     * @throws ApiError
     */
    public static marketplaceWebhooksGetCollection(
        fieldsMarketplaceWebhooks?: Array<'endpointUrl'>,
        limit?: number,
    ): CancelablePromise<MarketplaceWebhooksResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/marketplaceWebhooks',
            query: {
                'fields[marketplaceWebhooks]': fieldsMarketplaceWebhooks,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param requestBody MarketplaceWebhook representation
     * @returns MarketplaceWebhookResponse Single MarketplaceWebhook
     * @throws ApiError
     */
    public static marketplaceWebhooksCreateInstance(
        requestBody: MarketplaceWebhookCreateRequest,
    ): CancelablePromise<MarketplaceWebhookResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/marketplaceWebhooks',
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
     * @param requestBody MarketplaceWebhook representation
     * @returns MarketplaceWebhookResponse Single MarketplaceWebhook
     * @throws ApiError
     */
    public static marketplaceWebhooksUpdateInstance(
        id: string,
        requestBody: MarketplaceWebhookUpdateRequest,
    ): CancelablePromise<MarketplaceWebhookResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/marketplaceWebhooks/{id}',
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
    public static marketplaceWebhooksDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/marketplaceWebhooks/{id}',
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
}
