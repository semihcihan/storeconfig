/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackageDeltaResponse } from '../models/AlternativeDistributionPackageDeltaResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionPackageDeltasService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAlternativeDistributionPackageDeltas the fields to include for returned resources of type alternativeDistributionPackageDeltas
     * @returns AlternativeDistributionPackageDeltaResponse Single AlternativeDistributionPackageDelta
     * @throws ApiError
     */
    public static alternativeDistributionPackageDeltasGetInstance(
        id: string,
        fieldsAlternativeDistributionPackageDeltas?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
    ): CancelablePromise<AlternativeDistributionPackageDeltaResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageDeltas/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackageDeltas]': fieldsAlternativeDistributionPackageDeltas,
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
