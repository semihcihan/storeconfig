/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReportRequestCreateRequest } from '../models/AnalyticsReportRequestCreateRequest';
import type { AnalyticsReportRequestReportsLinkagesResponse } from '../models/AnalyticsReportRequestReportsLinkagesResponse';
import type { AnalyticsReportRequestResponse } from '../models/AnalyticsReportRequestResponse';
import type { AnalyticsReportsResponse } from '../models/AnalyticsReportsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsReportRequestsService {
    /**
     * @param requestBody AnalyticsReportRequest representation
     * @returns AnalyticsReportRequestResponse Single AnalyticsReportRequest
     * @throws ApiError
     */
    public static analyticsReportRequestsCreateInstance(
        requestBody: AnalyticsReportRequestCreateRequest,
    ): CancelablePromise<AnalyticsReportRequestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/analyticsReportRequests',
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
     * @param fieldsAnalyticsReportRequests the fields to include for returned resources of type analyticsReportRequests
     * @param fieldsAnalyticsReports the fields to include for returned resources of type analyticsReports
     * @param include comma-separated list of relationships to include
     * @param limitReports maximum number of related reports returned (when they are included)
     * @returns AnalyticsReportRequestResponse Single AnalyticsReportRequest
     * @throws ApiError
     */
    public static analyticsReportRequestsGetInstance(
        id: string,
        fieldsAnalyticsReportRequests?: Array<'accessType' | 'stoppedDueToInactivity' | 'reports'>,
        fieldsAnalyticsReports?: Array<'name' | 'category' | 'instances'>,
        include?: Array<'reports'>,
        limitReports?: number,
    ): CancelablePromise<AnalyticsReportRequestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportRequests/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[analyticsReportRequests]': fieldsAnalyticsReportRequests,
                'fields[analyticsReports]': fieldsAnalyticsReports,
                'include': include,
                'limit[reports]': limitReports,
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
     * @returns void
     * @throws ApiError
     */
    public static analyticsReportRequestsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/analyticsReportRequests/{id}',
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
     * @returns AnalyticsReportRequestReportsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static analyticsReportRequestsReportsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AnalyticsReportRequestReportsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportRequests/{id}/relationships/reports',
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
     * @param filterName filter by attribute 'name'
     * @param filterCategory filter by attribute 'category'
     * @param fieldsAnalyticsReports the fields to include for returned resources of type analyticsReports
     * @param limit maximum resources per page
     * @returns AnalyticsReportsResponse List of AnalyticsReports
     * @throws ApiError
     */
    public static analyticsReportRequestsReportsGetToManyRelated(
        id: string,
        filterName?: Array<string>,
        filterCategory?: Array<'APP_USAGE' | 'APP_STORE_ENGAGEMENT' | 'COMMERCE' | 'FRAMEWORK_USAGE' | 'PERFORMANCE'>,
        fieldsAnalyticsReports?: Array<'name' | 'category' | 'instances'>,
        limit?: number,
    ): CancelablePromise<AnalyticsReportsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportRequests/{id}/reports',
            path: {
                'id': id,
            },
            query: {
                'filter[name]': filterName,
                'filter[category]': filterCategory,
                'fields[analyticsReports]': fieldsAnalyticsReports,
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
