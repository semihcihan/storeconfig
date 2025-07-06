/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionPhasedReleaseCreateRequest } from '../models/AppStoreVersionPhasedReleaseCreateRequest';
import type { AppStoreVersionPhasedReleaseResponse } from '../models/AppStoreVersionPhasedReleaseResponse';
import type { AppStoreVersionPhasedReleaseUpdateRequest } from '../models/AppStoreVersionPhasedReleaseUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionPhasedReleasesService {
    /**
     * @param requestBody AppStoreVersionPhasedRelease representation
     * @returns AppStoreVersionPhasedReleaseResponse Single AppStoreVersionPhasedRelease
     * @throws ApiError
     */
    public static appStoreVersionPhasedReleasesCreateInstance(
        requestBody: AppStoreVersionPhasedReleaseCreateRequest,
    ): CancelablePromise<AppStoreVersionPhasedReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionPhasedReleases',
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
     * @param requestBody AppStoreVersionPhasedRelease representation
     * @returns AppStoreVersionPhasedReleaseResponse Single AppStoreVersionPhasedRelease
     * @throws ApiError
     */
    public static appStoreVersionPhasedReleasesUpdateInstance(
        id: string,
        requestBody: AppStoreVersionPhasedReleaseUpdateRequest,
    ): CancelablePromise<AppStoreVersionPhasedReleaseResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersionPhasedReleases/{id}',
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
    public static appStoreVersionPhasedReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreVersionPhasedReleases/{id}',
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
