/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferCodeCreateRequest } from '../models/SubscriptionOfferCodeCreateRequest';
import type { SubscriptionOfferCodeCustomCodesLinkagesResponse } from '../models/SubscriptionOfferCodeCustomCodesLinkagesResponse';
import type { SubscriptionOfferCodeCustomCodesResponse } from '../models/SubscriptionOfferCodeCustomCodesResponse';
import type { SubscriptionOfferCodeOneTimeUseCodesLinkagesResponse } from '../models/SubscriptionOfferCodeOneTimeUseCodesLinkagesResponse';
import type { SubscriptionOfferCodeOneTimeUseCodesResponse } from '../models/SubscriptionOfferCodeOneTimeUseCodesResponse';
import type { SubscriptionOfferCodePricesLinkagesResponse } from '../models/SubscriptionOfferCodePricesLinkagesResponse';
import type { SubscriptionOfferCodePricesResponse } from '../models/SubscriptionOfferCodePricesResponse';
import type { SubscriptionOfferCodeResponse } from '../models/SubscriptionOfferCodeResponse';
import type { SubscriptionOfferCodeUpdateRequest } from '../models/SubscriptionOfferCodeUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionOfferCodesService {
    /**
     * @param requestBody SubscriptionOfferCode representation
     * @returns SubscriptionOfferCodeResponse Single SubscriptionOfferCode
     * @throws ApiError
     */
    public static subscriptionOfferCodesCreateInstance(
        requestBody: SubscriptionOfferCodeCreateRequest,
    ): CancelablePromise<SubscriptionOfferCodeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionOfferCodes',
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
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param fieldsSubscriptionOfferCodeOneTimeUseCodes the fields to include for returned resources of type subscriptionOfferCodeOneTimeUseCodes
     * @param fieldsSubscriptionOfferCodeCustomCodes the fields to include for returned resources of type subscriptionOfferCodeCustomCodes
     * @param fieldsSubscriptionOfferCodePrices the fields to include for returned resources of type subscriptionOfferCodePrices
     * @param include comma-separated list of relationships to include
     * @param limitCustomCodes maximum number of related customCodes returned (when they are included)
     * @param limitOneTimeUseCodes maximum number of related oneTimeUseCodes returned (when they are included)
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns SubscriptionOfferCodeResponse Single SubscriptionOfferCode
     * @throws ApiError
     */
    public static subscriptionOfferCodesGetInstance(
        id: string,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        fieldsSubscriptionOfferCodeOneTimeUseCodes?: Array<'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode' | 'values'>,
        fieldsSubscriptionOfferCodeCustomCodes?: Array<'customCode' | 'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode'>,
        fieldsSubscriptionOfferCodePrices?: Array<'territory' | 'subscriptionPricePoint'>,
        include?: Array<'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        limitCustomCodes?: number,
        limitOneTimeUseCodes?: number,
        limitPrices?: number,
    ): CancelablePromise<SubscriptionOfferCodeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
                'fields[subscriptionOfferCodeOneTimeUseCodes]': fieldsSubscriptionOfferCodeOneTimeUseCodes,
                'fields[subscriptionOfferCodeCustomCodes]': fieldsSubscriptionOfferCodeCustomCodes,
                'fields[subscriptionOfferCodePrices]': fieldsSubscriptionOfferCodePrices,
                'include': include,
                'limit[customCodes]': limitCustomCodes,
                'limit[oneTimeUseCodes]': limitOneTimeUseCodes,
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
     * @param requestBody SubscriptionOfferCode representation
     * @returns SubscriptionOfferCodeResponse Single SubscriptionOfferCode
     * @throws ApiError
     */
    public static subscriptionOfferCodesUpdateInstance(
        id: string,
        requestBody: SubscriptionOfferCodeUpdateRequest,
    ): CancelablePromise<SubscriptionOfferCodeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionOfferCodes/{id}',
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
     * @param limit maximum resources per page
     * @returns SubscriptionOfferCodeCustomCodesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionOfferCodesCustomCodesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionOfferCodeCustomCodesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/relationships/customCodes',
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
     * @param fieldsSubscriptionOfferCodeCustomCodes the fields to include for returned resources of type subscriptionOfferCodeCustomCodes
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionOfferCodeCustomCodesResponse List of SubscriptionOfferCodeCustomCodes
     * @throws ApiError
     */
    public static subscriptionOfferCodesCustomCodesGetToManyRelated(
        id: string,
        fieldsSubscriptionOfferCodeCustomCodes?: Array<'customCode' | 'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode'>,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        limit?: number,
        include?: Array<'offerCode'>,
    ): CancelablePromise<SubscriptionOfferCodeCustomCodesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/customCodes',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionOfferCodeCustomCodes]': fieldsSubscriptionOfferCodeCustomCodes,
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns SubscriptionOfferCodeOneTimeUseCodesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionOfferCodesOneTimeUseCodesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionOfferCodeOneTimeUseCodesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/relationships/oneTimeUseCodes',
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
     * @param fieldsSubscriptionOfferCodeOneTimeUseCodes the fields to include for returned resources of type subscriptionOfferCodeOneTimeUseCodes
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionOfferCodeOneTimeUseCodesResponse List of SubscriptionOfferCodeOneTimeUseCodes
     * @throws ApiError
     */
    public static subscriptionOfferCodesOneTimeUseCodesGetToManyRelated(
        id: string,
        fieldsSubscriptionOfferCodeOneTimeUseCodes?: Array<'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode' | 'values'>,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        limit?: number,
        include?: Array<'offerCode'>,
    ): CancelablePromise<SubscriptionOfferCodeOneTimeUseCodesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/oneTimeUseCodes',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionOfferCodeOneTimeUseCodes]': fieldsSubscriptionOfferCodeOneTimeUseCodes,
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns SubscriptionOfferCodePricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionOfferCodesPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionOfferCodePricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/relationships/prices',
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
     * @param fieldsSubscriptionOfferCodePrices the fields to include for returned resources of type subscriptionOfferCodePrices
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionOfferCodePricesResponse List of SubscriptionOfferCodePrices
     * @throws ApiError
     */
    public static subscriptionOfferCodesPricesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionOfferCodePrices?: Array<'territory' | 'subscriptionPricePoint'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        limit?: number,
        include?: Array<'territory' | 'subscriptionPricePoint'>,
    ): CancelablePromise<SubscriptionOfferCodePricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodes/{id}/prices',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionOfferCodePrices]': fieldsSubscriptionOfferCodePrices,
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
