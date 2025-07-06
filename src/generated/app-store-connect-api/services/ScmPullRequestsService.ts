/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScmPullRequestResponse } from '../models/ScmPullRequestResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScmPullRequestsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsScmPullRequests the fields to include for returned resources of type scmPullRequests
     * @param include comma-separated list of relationships to include
     * @returns ScmPullRequestResponse Single ScmPullRequest
     * @throws ApiError
     */
    public static scmPullRequestsGetInstance(
        id: string,
        fieldsScmPullRequests?: Array<'title' | 'number' | 'webUrl' | 'sourceRepositoryOwner' | 'sourceRepositoryName' | 'sourceBranchName' | 'destinationRepositoryOwner' | 'destinationRepositoryName' | 'destinationBranchName' | 'isClosed' | 'isCrossRepository' | 'repository'>,
        include?: Array<'repository'>,
    ): CancelablePromise<ScmPullRequestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmPullRequests/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[scmPullRequests]': fieldsScmPullRequests,
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
