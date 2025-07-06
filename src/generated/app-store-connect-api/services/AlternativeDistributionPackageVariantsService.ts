/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackageVariantResponse } from '../models/AlternativeDistributionPackageVariantResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionPackageVariantsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAlternativeDistributionPackageVariants the fields to include for returned resources of type alternativeDistributionPackageVariants
     * @returns AlternativeDistributionPackageVariantResponse Single AlternativeDistributionPackageVariant
     * @throws ApiError
     */
    public static alternativeDistributionPackageVariantsGetInstance(
        id: string,
        fieldsAlternativeDistributionPackageVariants?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
    ): CancelablePromise<AlternativeDistributionPackageVariantResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVariants/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackageVariants]': fieldsAlternativeDistributionPackageVariants,
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
