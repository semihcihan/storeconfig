/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReportInstancesLinkagesResponse } from '../models/AnalyticsReportInstancesLinkagesResponse';
import type { AnalyticsReportInstancesResponse } from '../models/AnalyticsReportInstancesResponse';
import type { AnalyticsReportResponse } from '../models/AnalyticsReportResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsReportsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAnalyticsReports the fields to include for returned resources of type analyticsReports
     * @returns AnalyticsReportResponse Single AnalyticsReport
     * @throws ApiError
     */
    public static analyticsReportsGetInstance(
        id: string,
        fieldsAnalyticsReports?: Array<'name' | 'category' | 'instances'>,
    ): CancelablePromise<AnalyticsReportResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReports/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[analyticsReports]': fieldsAnalyticsReports,
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
     * @returns AnalyticsReportInstancesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static analyticsReportsInstancesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AnalyticsReportInstancesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReports/{id}/relationships/instances',
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
     * @param filterGranularity filter by attribute 'granularity'
     * @param filterProcessingDate filter by attribute 'processingDate'
     * @param fieldsAnalyticsReportInstances the fields to include for returned resources of type analyticsReportInstances
     * @param limit maximum resources per page
     * @returns AnalyticsReportInstancesResponse List of AnalyticsReportInstances
     * @throws ApiError
     */
    public static analyticsReportsInstancesGetToManyRelated(
        id: string,
        filterGranularity?: Array<'DAILY' | 'WEEKLY' | 'MONTHLY'>,
        filterProcessingDate?: Array<string>,
        fieldsAnalyticsReportInstances?: Array<'granularity' | 'processingDate' | 'segments'>,
        limit?: number,
    ): CancelablePromise<AnalyticsReportInstancesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReports/{id}/instances',
            path: {
                'id': id,
            },
            query: {
                'filter[granularity]': filterGranularity,
                'filter[processingDate]': filterProcessingDate,
                'fields[analyticsReportInstances]': fieldsAnalyticsReportInstances,
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
