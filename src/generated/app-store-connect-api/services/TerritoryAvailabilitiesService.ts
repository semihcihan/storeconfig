/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TerritoryAvailabilityResponse } from '../models/TerritoryAvailabilityResponse';
import type { TerritoryAvailabilityUpdateRequest } from '../models/TerritoryAvailabilityUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TerritoryAvailabilitiesService {
    /**
     * @param id the id of the requested resource
     * @param requestBody TerritoryAvailability representation
     * @returns TerritoryAvailabilityResponse Single TerritoryAvailability
     * @throws ApiError
     */
    public static territoryAvailabilitiesUpdateInstance(
        id: string,
        requestBody: TerritoryAvailabilityUpdateRequest,
    ): CancelablePromise<TerritoryAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/territoryAvailabilities/{id}',
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
