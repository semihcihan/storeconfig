/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScmProviderRepositoriesLinkagesResponse } from '../models/ScmProviderRepositoriesLinkagesResponse';
import type { ScmProviderResponse } from '../models/ScmProviderResponse';
import type { ScmProvidersResponse } from '../models/ScmProvidersResponse';
import type { ScmRepositoriesResponse } from '../models/ScmRepositoriesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScmProvidersService {
    /**
     * @param fieldsScmProviders the fields to include for returned resources of type scmProviders
     * @param limit maximum resources per page
     * @returns ScmProvidersResponse List of ScmProviders
     * @throws ApiError
     */
    public static scmProvidersGetCollection(
        fieldsScmProviders?: Array<'scmProviderType' | 'url' | 'repositories'>,
        limit?: number,
    ): CancelablePromise<ScmProvidersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmProviders',
            query: {
                'fields[scmProviders]': fieldsScmProviders,
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
     * @param fieldsScmProviders the fields to include for returned resources of type scmProviders
     * @returns ScmProviderResponse Single ScmProvider
     * @throws ApiError
     */
    public static scmProvidersGetInstance(
        id: string,
        fieldsScmProviders?: Array<'scmProviderType' | 'url' | 'repositories'>,
    ): CancelablePromise<ScmProviderResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmProviders/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[scmProviders]': fieldsScmProviders,
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
     * @returns ScmProviderRepositoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static scmProvidersRepositoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ScmProviderRepositoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmProviders/{id}/relationships/repositories',
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
     * @param filterId filter by id(s)
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param fieldsScmProviders the fields to include for returned resources of type scmProviders
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns ScmRepositoriesResponse List of ScmRepositories
     * @throws ApiError
     */
    public static scmProvidersRepositoriesGetToManyRelated(
        id: string,
        filterId?: Array<string>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        fieldsScmProviders?: Array<'scmProviderType' | 'url' | 'repositories'>,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        limit?: number,
        include?: Array<'scmProvider' | 'defaultBranch'>,
    ): CancelablePromise<ScmRepositoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scmProviders/{id}/repositories',
            path: {
                'id': id,
            },
            query: {
                'filter[id]': filterId,
                'fields[scmRepositories]': fieldsScmRepositories,
                'fields[scmProviders]': fieldsScmProviders,
                'fields[scmGitReferences]': fieldsScmGitReferences,
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
