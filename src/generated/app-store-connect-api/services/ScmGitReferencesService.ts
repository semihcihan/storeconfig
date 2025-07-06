/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScmGitReferenceResponse } from '../models/ScmGitReferenceResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScmGitReferencesService {
    /**
     * @param id the id of the requested resource
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param include comma-separated list of relationships to include
     * @returns ScmGitReferenceResponse Single ScmGitReference
     * @throws ApiError
     */
    public static scmGitReferencesGetInstance(
        id: string,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        include?: Array<'repository'>,
    ): CancelablePromise<ScmGitReferenceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmGitReferences/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[scmGitReferences]': fieldsScmGitReferences,
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
