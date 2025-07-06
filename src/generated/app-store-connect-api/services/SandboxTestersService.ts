/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SandboxTestersV2Response } from '../models/SandboxTestersV2Response';
import type { SandboxTesterV2Response } from '../models/SandboxTesterV2Response';
import type { SandboxTesterV2UpdateRequest } from '../models/SandboxTesterV2UpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SandboxTestersService {
    /**
     * @param fieldsSandboxTesters the fields to include for returned resources of type sandboxTesters
     * @param limit maximum resources per page
     * @returns SandboxTestersV2Response List of SandboxTesters
     * @throws ApiError
     */
    public static sandboxTestersV2GetCollection(
        fieldsSandboxTesters?: Array<'firstName' | 'lastName' | 'acAccountName' | 'territory' | 'applePayCompatible' | 'interruptPurchases' | 'subscriptionRenewalRate'>,
        limit?: number,
    ): CancelablePromise<SandboxTestersV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/sandboxTesters',
            query: {
                'fields[sandboxTesters]': fieldsSandboxTesters,
                'limit': limit,
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
     * @param id the id of the requested resource
     * @param requestBody SandboxTester representation
     * @returns SandboxTesterV2Response Single SandboxTester
     * @throws ApiError
     */
    public static sandboxTestersV2UpdateInstance(
        id: string,
        requestBody: SandboxTesterV2UpdateRequest,
    ): CancelablePromise<SandboxTesterV2Response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v2/sandboxTesters/{id}',
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
}
