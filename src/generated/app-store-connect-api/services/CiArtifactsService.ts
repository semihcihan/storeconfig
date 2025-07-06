/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiArtifactResponse } from '../models/CiArtifactResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiArtifactsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsCiArtifacts the fields to include for returned resources of type ciArtifacts
     * @returns CiArtifactResponse Single CiArtifact
     * @throws ApiError
     */
    public static ciArtifactsGetInstance(
        id: string,
        fieldsCiArtifacts?: Array<'fileType' | 'fileName' | 'fileSize' | 'downloadUrl'>,
    ): CancelablePromise<CiArtifactResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciArtifacts/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciArtifacts]': fieldsCiArtifacts,
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
