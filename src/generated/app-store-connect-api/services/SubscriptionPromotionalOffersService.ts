/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPromotionalOfferCreateRequest } from '../models/SubscriptionPromotionalOfferCreateRequest';
import type { SubscriptionPromotionalOfferPricesLinkagesResponse } from '../models/SubscriptionPromotionalOfferPricesLinkagesResponse';
import type { SubscriptionPromotionalOfferPricesResponse } from '../models/SubscriptionPromotionalOfferPricesResponse';
import type { SubscriptionPromotionalOfferResponse } from '../models/SubscriptionPromotionalOfferResponse';
import type { SubscriptionPromotionalOfferUpdateRequest } from '../models/SubscriptionPromotionalOfferUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionPromotionalOffersService {
    /**
     * @param requestBody SubscriptionPromotionalOffer representation
     * @returns SubscriptionPromotionalOfferResponse Single SubscriptionPromotionalOffer
     * @throws ApiError
     */
    public static subscriptionPromotionalOffersCreateInstance(
        requestBody: SubscriptionPromotionalOfferCreateRequest,
    ): CancelablePromise<SubscriptionPromotionalOfferResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionPromotionalOffers',
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
     * @param fieldsSubscriptionPromotionalOffers the fields to include for returned resources of type subscriptionPromotionalOffers
     * @param fieldsSubscriptionPromotionalOfferPrices the fields to include for returned resources of type subscriptionPromotionalOfferPrices
     * @param include comma-separated list of relationships to include
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns SubscriptionPromotionalOfferResponse Single SubscriptionPromotionalOffer
     * @throws ApiError
     */
    public static subscriptionPromotionalOffersGetInstance(
        id: string,
        fieldsSubscriptionPromotionalOffers?: Array<'duration' | 'name' | 'numberOfPeriods' | 'offerCode' | 'offerMode' | 'subscription' | 'prices'>,
        fieldsSubscriptionPromotionalOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        include?: Array<'subscription' | 'prices'>,
        limitPrices?: number,
    ): CancelablePromise<SubscriptionPromotionalOfferResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPromotionalOffers/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionPromotionalOffers]': fieldsSubscriptionPromotionalOffers,
                'fields[subscriptionPromotionalOfferPrices]': fieldsSubscriptionPromotionalOfferPrices,
                'include': include,
                'limit[prices]': limitPrices,
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
     * @param requestBody SubscriptionPromotionalOffer representation
     * @returns SubscriptionPromotionalOfferResponse Single SubscriptionPromotionalOffer
     * @throws ApiError
     */
    public static subscriptionPromotionalOffersUpdateInstance(
        id: string,
        requestBody: SubscriptionPromotionalOfferUpdateRequest,
    ): CancelablePromise<SubscriptionPromotionalOfferResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionPromotionalOffers/{id}',
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
    public static subscriptionPromotionalOffersDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionPromotionalOffers/{id}',
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
     * @returns SubscriptionPromotionalOfferPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionPromotionalOffersPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionPromotionalOfferPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPromotionalOffers/{id}/relationships/prices',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsSubscriptionPromotionalOfferPrices the fields to include for returned resources of type subscriptionPromotionalOfferPrices
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionPromotionalOfferPricesResponse List of SubscriptionPromotionalOfferPrices
     * @throws ApiError
     */
    public static subscriptionPromotionalOffersPricesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionPromotionalOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        limit?: number,
        include?: Array<'territory' | 'subscriptionPricePoint'>,
    ): CancelablePromise<SubscriptionPromotionalOfferPricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPromotionalOffers/{id}/prices',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionPromotionalOfferPrices]': fieldsSubscriptionPromotionalOfferPrices,
                'fields[territories]': fieldsTerritories,
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
