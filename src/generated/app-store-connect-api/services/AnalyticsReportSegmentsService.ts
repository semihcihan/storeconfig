/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReportSegmentResponse } from '../models/AnalyticsReportSegmentResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsReportSegmentsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAnalyticsReportSegments the fields to include for returned resources of type analyticsReportSegments
     * @returns AnalyticsReportSegmentResponse Single AnalyticsReportSegment
     * @throws ApiError
     */
    public static analyticsReportSegmentsGetInstance(
        id: string,
        fieldsAnalyticsReportSegments?: Array<'checksum' | 'sizeInBytes' | 'url'>,
    ): CancelablePromise<AnalyticsReportSegmentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/analyticsReportSegments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[analyticsReportSegments]': fieldsAnalyticsReportSegments,
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
