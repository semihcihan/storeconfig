/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndUserLicenseAgreementCreateRequest } from '../models/EndUserLicenseAgreementCreateRequest';
import type { EndUserLicenseAgreementResponse } from '../models/EndUserLicenseAgreementResponse';
import type { EndUserLicenseAgreementTerritoriesLinkagesResponse } from '../models/EndUserLicenseAgreementTerritoriesLinkagesResponse';
import type { EndUserLicenseAgreementUpdateRequest } from '../models/EndUserLicenseAgreementUpdateRequest';
import type { TerritoriesWithoutIncludesResponse } from '../models/TerritoriesWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EndUserLicenseAgreementsService {
    /**
     * @param requestBody EndUserLicenseAgreement representation
     * @returns EndUserLicenseAgreementResponse Single EndUserLicenseAgreement
     * @throws ApiError
     */
    public static endUserLicenseAgreementsCreateInstance(
        requestBody: EndUserLicenseAgreementCreateRequest,
    ): CancelablePromise<EndUserLicenseAgreementResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/endUserLicenseAgreements',
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
     * @param fieldsEndUserLicenseAgreements the fields to include for returned resources of type endUserLicenseAgreements
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param include comma-separated list of relationships to include
     * @param limitTerritories maximum number of related territories returned (when they are included)
     * @returns EndUserLicenseAgreementResponse Single EndUserLicenseAgreement
     * @throws ApiError
     */
    public static endUserLicenseAgreementsGetInstance(
        id: string,
        fieldsEndUserLicenseAgreements?: Array<'agreementText' | 'app' | 'territories'>,
        fieldsTerritories?: Array<'currency'>,
        include?: Array<'app' | 'territories'>,
        limitTerritories?: number,
    ): CancelablePromise<EndUserLicenseAgreementResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/endUserLicenseAgreements/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[endUserLicenseAgreements]': fieldsEndUserLicenseAgreements,
                'fields[territories]': fieldsTerritories,
                'include': include,
                'limit[territories]': limitTerritories,
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
     * @param requestBody EndUserLicenseAgreement representation
     * @returns EndUserLicenseAgreementResponse Single EndUserLicenseAgreement
     * @throws ApiError
     */
    public static endUserLicenseAgreementsUpdateInstance(
        id: string,
        requestBody: EndUserLicenseAgreementUpdateRequest,
    ): CancelablePromise<EndUserLicenseAgreementResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/endUserLicenseAgreements/{id}',
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
    public static endUserLicenseAgreementsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/endUserLicenseAgreements/{id}',
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
     * @returns EndUserLicenseAgreementTerritoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static endUserLicenseAgreementsTerritoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<EndUserLicenseAgreementTerritoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/endUserLicenseAgreements/{id}/relationships/territories',
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
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @returns TerritoriesWithoutIncludesResponse List of Territories with get
     * @throws ApiError
     */
    public static endUserLicenseAgreementsTerritoriesGetToManyRelated(
        id: string,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
    ): CancelablePromise<TerritoriesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/endUserLicenseAgreements/{id}/territories',
            path: {
                'id': id,
            },
            query: {
                'fields[territories]': fieldsTerritories,
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
}
