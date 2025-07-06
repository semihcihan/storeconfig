/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NominationCreateRequest } from '../models/NominationCreateRequest';
import type { NominationResponse } from '../models/NominationResponse';
import type { NominationsResponse } from '../models/NominationsResponse';
import type { NominationUpdateRequest } from '../models/NominationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NominationsService {
    /**
     * @param filterState filter by attribute 'state'
     * @param filterType filter by attribute 'type'
     * @param filterRelatedApps filter by id(s) of related 'relatedApps'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsNominations the fields to include for returned resources of type nominations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitInAppEvents maximum number of related inAppEvents returned (when they are included)
     * @param limitRelatedApps maximum number of related relatedApps returned (when they are included)
     * @param limitSupportedTerritories maximum number of related supportedTerritories returned (when they are included)
     * @returns NominationsResponse List of Nominations
     * @throws ApiError
     */
    public static nominationsGetCollection(
        filterState: Array<'DRAFT' | 'SUBMITTED' | 'ARCHIVED'>,
        filterType?: Array<'APP_LAUNCH' | 'APP_ENHANCEMENTS' | 'NEW_CONTENT'>,
        filterRelatedApps?: Array<string>,
        sort?: Array<'lastModifiedDate' | '-lastModifiedDate' | 'publishStartDate' | '-publishStartDate' | 'publishEndDate' | '-publishEndDate' | 'name' | '-name' | 'type' | '-type'>,
        fieldsNominations?: Array<'name' | 'type' | 'description' | 'createdDate' | 'lastModifiedDate' | 'submittedDate' | 'state' | 'publishStartDate' | 'publishEndDate' | 'deviceFamilies' | 'locales' | 'supplementalMaterialsUris' | 'hasInAppEvents' | 'launchInSelectMarketsFirst' | 'notes' | 'preOrderEnabled' | 'relatedApps' | 'createdByActor' | 'lastModifiedByActor' | 'submittedByActor' | 'inAppEvents' | 'supportedTerritories'>,
        limit?: number,
        include?: Array<'relatedApps' | 'createdByActor' | 'lastModifiedByActor' | 'submittedByActor' | 'inAppEvents' | 'supportedTerritories'>,
        limitInAppEvents?: number,
        limitRelatedApps?: number,
        limitSupportedTerritories?: number,
    ): CancelablePromise<NominationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/nominations',
            query: {
                'filter[type]': filterType,
                'filter[state]': filterState,
                'filter[relatedApps]': filterRelatedApps,
                'sort': sort,
                'fields[nominations]': fieldsNominations,
                'limit': limit,
                'include': include,
                'limit[inAppEvents]': limitInAppEvents,
                'limit[relatedApps]': limitRelatedApps,
                'limit[supportedTerritories]': limitSupportedTerritories,
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
     * @param requestBody Nomination representation
     * @returns NominationResponse Single Nomination
     * @throws ApiError
     */
    public static nominationsCreateInstance(
        requestBody: NominationCreateRequest,
    ): CancelablePromise<NominationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/nominations',
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
     * @param fieldsNominations the fields to include for returned resources of type nominations
     * @param include comma-separated list of relationships to include
     * @param limitInAppEvents maximum number of related inAppEvents returned (when they are included)
     * @param limitRelatedApps maximum number of related relatedApps returned (when they are included)
     * @param limitSupportedTerritories maximum number of related supportedTerritories returned (when they are included)
     * @returns NominationResponse Single Nomination
     * @throws ApiError
     */
    public static nominationsGetInstance(
        id: string,
        fieldsNominations?: Array<'name' | 'type' | 'description' | 'createdDate' | 'lastModifiedDate' | 'submittedDate' | 'state' | 'publishStartDate' | 'publishEndDate' | 'deviceFamilies' | 'locales' | 'supplementalMaterialsUris' | 'hasInAppEvents' | 'launchInSelectMarketsFirst' | 'notes' | 'preOrderEnabled' | 'relatedApps' | 'createdByActor' | 'lastModifiedByActor' | 'submittedByActor' | 'inAppEvents' | 'supportedTerritories'>,
        include?: Array<'relatedApps' | 'createdByActor' | 'lastModifiedByActor' | 'submittedByActor' | 'inAppEvents' | 'supportedTerritories'>,
        limitInAppEvents?: number,
        limitRelatedApps?: number,
        limitSupportedTerritories?: number,
    ): CancelablePromise<NominationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/nominations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[nominations]': fieldsNominations,
                'include': include,
                'limit[inAppEvents]': limitInAppEvents,
                'limit[relatedApps]': limitRelatedApps,
                'limit[supportedTerritories]': limitSupportedTerritories,
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
     * @param requestBody Nomination representation
     * @returns NominationResponse Single Nomination
     * @throws ApiError
     */
    public static nominationsUpdateInstance(
        id: string,
        requestBody: NominationUpdateRequest,
    ): CancelablePromise<NominationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/nominations/{id}',
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
    public static nominationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/nominations/{id}',
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
