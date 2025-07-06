/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetVersionInternalBetaReleaseResponse } from '../models/BackgroundAssetVersionInternalBetaReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackgroundAssetVersionInternalBetaReleasesService {
    /**
     * @param id the id of the requested resource
     * @param fieldsBackgroundAssetVersionInternalBetaReleases the fields to include for returned resources of type backgroundAssetVersionInternalBetaReleases
     * @param include comma-separated list of relationships to include
     * @returns BackgroundAssetVersionInternalBetaReleaseResponse Single BackgroundAssetVersionInternalBetaRelease
     * @throws ApiError
     */
    public static backgroundAssetVersionInternalBetaReleasesGetInstance(
        id: string,
        fieldsBackgroundAssetVersionInternalBetaReleases?: Array<'state' | 'backgroundAssetVersion'>,
        include?: Array<'backgroundAssetVersion'>,
    ): CancelablePromise<BackgroundAssetVersionInternalBetaReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssetVersionInternalBetaReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[backgroundAssetVersionInternalBetaReleases]': fieldsBackgroundAssetVersionInternalBetaReleases,
                'include': include,
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
