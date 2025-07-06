/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScmGitReferencesResponse } from '../models/ScmGitReferencesResponse';
import type { ScmPullRequestsResponse } from '../models/ScmPullRequestsResponse';
import type { ScmRepositoriesResponse } from '../models/ScmRepositoriesResponse';
import type { ScmRepositoryGitReferencesLinkagesResponse } from '../models/ScmRepositoryGitReferencesLinkagesResponse';
import type { ScmRepositoryPullRequestsLinkagesResponse } from '../models/ScmRepositoryPullRequestsLinkagesResponse';
import type { ScmRepositoryResponse } from '../models/ScmRepositoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScmRepositoriesService {
    /**
     * @param filterId filter by id(s)
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns ScmRepositoriesResponse List of ScmRepositories
     * @throws ApiError
     */
    public static scmRepositoriesGetCollection(
        filterId?: Array<string>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        limit?: number,
        include?: Array<'scmProvider' | 'defaultBranch'>,
    ): CancelablePromise<ScmRepositoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories',
            query: {
                'filter[id]': filterId,
                'fields[scmRepositories]': fieldsScmRepositories,
                'limit': limit,
                'include': include,
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
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param include comma-separated list of relationships to include
     * @returns ScmRepositoryResponse Single ScmRepository
     * @throws ApiError
     */
    public static scmRepositoriesGetInstance(
        id: string,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        include?: Array<'scmProvider' | 'defaultBranch'>,
    ): CancelablePromise<ScmRepositoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[scmRepositories]': fieldsScmRepositories,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns ScmRepositoryGitReferencesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static scmRepositoriesGitReferencesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ScmRepositoryGitReferencesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories/{id}/relationships/gitReferences',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns ScmGitReferencesResponse List of ScmGitReferences
     * @throws ApiError
     */
    public static scmRepositoriesGitReferencesGetToManyRelated(
        id: string,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        limit?: number,
        include?: Array<'repository'>,
    ): CancelablePromise<ScmGitReferencesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories/{id}/gitReferences',
            path: {
                'id': id,
            },
            query: {
                'fields[scmGitReferences]': fieldsScmGitReferences,
                'fields[scmRepositories]': fieldsScmRepositories,
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns ScmRepositoryPullRequestsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static scmRepositoriesPullRequestsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ScmRepositoryPullRequestsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories/{id}/relationships/pullRequests',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param fieldsScmPullRequests the fields to include for returned resources of type scmPullRequests
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns ScmPullRequestsResponse List of ScmPullRequests
     * @throws ApiError
     */
    public static scmRepositoriesPullRequestsGetToManyRelated(
        id: string,
        fieldsScmPullRequests?: Array<'title' | 'number' | 'webUrl' | 'sourceRepositoryOwner' | 'sourceRepositoryName' | 'sourceBranchName' | 'destinationRepositoryOwner' | 'destinationRepositoryName' | 'destinationBranchName' | 'isClosed' | 'isCrossRepository' | 'repository'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        limit?: number,
        include?: Array<'repository'>,
    ): CancelablePromise<ScmPullRequestsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmRepositories/{id}/pullRequests',
            path: {
                'id': id,
            },
            query: {
                'fields[scmPullRequests]': fieldsScmPullRequests,
                'fields[scmRepositories]': fieldsScmRepositories,
                'limit': limit,
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
