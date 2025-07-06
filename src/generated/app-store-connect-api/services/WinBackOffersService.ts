/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WinBackOfferCreateRequest } from '../models/WinBackOfferCreateRequest';
import type { WinBackOfferPricesLinkagesResponse } from '../models/WinBackOfferPricesLinkagesResponse';
import type { WinBackOfferPricesResponse } from '../models/WinBackOfferPricesResponse';
import type { WinBackOfferResponse } from '../models/WinBackOfferResponse';
import type { WinBackOfferUpdateRequest } from '../models/WinBackOfferUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WinBackOffersService {
    /**
     * @param requestBody WinBackOffer representation
     * @returns WinBackOfferResponse Single WinBackOffer
     * @throws ApiError
     */
    public static winBackOffersCreateInstance(
        requestBody: WinBackOfferCreateRequest,
    ): CancelablePromise<WinBackOfferResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/winBackOffers',
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
     * @param fieldsWinBackOffers the fields to include for returned resources of type winBackOffers
     * @param fieldsWinBackOfferPrices the fields to include for returned resources of type winBackOfferPrices
     * @param include comma-separated list of relationships to include
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns WinBackOfferResponse Single WinBackOffer
     * @throws ApiError
     */
    public static winBackOffersGetInstance(
        id: string,
        fieldsWinBackOffers?: Array<'referenceName' | 'offerId' | 'duration' | 'offerMode' | 'periodCount' | 'customerEligibilityPaidSubscriptionDurationInMonths' | 'customerEligibilityTimeSinceLastSubscribedInMonths' | 'customerEligibilityWaitBetweenOffersInMonths' | 'startDate' | 'endDate' | 'priority' | 'promotionIntent' | 'prices'>,
        fieldsWinBackOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        include?: Array<'prices'>,
        limitPrices?: number,
    ): CancelablePromise<WinBackOfferResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/winBackOffers/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[winBackOffers]': fieldsWinBackOffers,
                'fields[winBackOfferPrices]': fieldsWinBackOfferPrices,
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
     * @param requestBody WinBackOffer representation
     * @returns WinBackOfferResponse Single WinBackOffer
     * @throws ApiError
     */
    public static winBackOffersUpdateInstance(
        id: string,
        requestBody: WinBackOfferUpdateRequest,
    ): CancelablePromise<WinBackOfferResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/winBackOffers/{id}',
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
    public static winBackOffersDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/winBackOffers/{id}',
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
     * @returns WinBackOfferPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static winBackOffersPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<WinBackOfferPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/winBackOffers/{id}/relationships/prices',
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
     * @param fieldsWinBackOfferPrices the fields to include for returned resources of type winBackOfferPrices
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns WinBackOfferPricesResponse List of WinBackOfferPrices
     * @throws ApiError
     */
    public static winBackOffersPricesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsWinBackOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        limit?: number,
        include?: Array<'territory' | 'subscriptionPricePoint'>,
    ): CancelablePromise<WinBackOfferPricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/winBackOffers/{id}/prices',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[winBackOfferPrices]': fieldsWinBackOfferPrices,
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
