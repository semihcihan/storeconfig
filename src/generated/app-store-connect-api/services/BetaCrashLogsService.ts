/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaCrashLogResponse } from '../models/BetaCrashLogResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaCrashLogsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsBetaCrashLogs the fields to include for returned resources of type betaCrashLogs
     * @returns BetaCrashLogResponse Single BetaCrashLog
     * @throws ApiError
     */
    public static betaCrashLogsGetInstance(
        id: string,
        fieldsBetaCrashLogs?: Array<'logText'>,
    ): CancelablePromise<BetaCrashLogResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaCrashLogs/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaCrashLogs]': fieldsBetaCrashLogs,
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
