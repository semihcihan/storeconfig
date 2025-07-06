/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReportInstanceResponse } from '../models/AnalyticsReportInstanceResponse';
import type { AnalyticsReportInstanceSegmentsLinkagesResponse } from '../models/AnalyticsReportInstanceSegmentsLinkagesResponse';
import type { AnalyticsReportSegmentsResponse } from '../models/AnalyticsReportSegmentsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsReportInstancesService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAnalyticsReportInstances the fields to include for returned resources of type analyticsReportInstances
     * @returns AnalyticsReportInstanceResponse Single AnalyticsReportInstance
     * @throws ApiError
     */
    public static analyticsReportInstancesGetInstance(
        id: string,
        fieldsAnalyticsReportInstances?: Array<'granularity' | 'processingDate' | 'segments'>,
    ): CancelablePromise<AnalyticsReportInstanceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportInstances/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[analyticsReportInstances]': fieldsAnalyticsReportInstances,
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
     * @returns AnalyticsReportInstanceSegmentsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static analyticsReportInstancesSegmentsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AnalyticsReportInstanceSegmentsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportInstances/{id}/relationships/segments',
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
     * @param fieldsAnalyticsReportSegments the fields to include for returned resources of type analyticsReportSegments
     * @param limit maximum resources per page
     * @returns AnalyticsReportSegmentsResponse List of AnalyticsReportSegments
     * @throws ApiError
     */
    public static analyticsReportInstancesSegmentsGetToManyRelated(
        id: string,
        fieldsAnalyticsReportSegments?: Array<'checksum' | 'sizeInBytes' | 'url'>,
        limit?: number,
    ): CancelablePromise<AnalyticsReportSegmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportInstances/{id}/segments',
            path: {
                'id': id,
            },
            query: {
                'fields[analyticsReportSegments]': fieldsAnalyticsReportSegments,
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
