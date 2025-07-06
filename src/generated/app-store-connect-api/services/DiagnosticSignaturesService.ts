/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { diagnosticLogs } from '../models/diagnosticLogs';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DiagnosticSignaturesService {
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns diagnosticLogs List of DiagnosticLogs
     * @throws ApiError
     */
    public static diagnosticSignaturesLogsGetToManyRelated(
        id: string,
        limit?: number,
    ): CancelablePromise<diagnosticLogs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/diagnosticSignatures/{id}/logs',
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
}
