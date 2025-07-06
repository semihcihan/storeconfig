/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBuildRunsResponse } from '../models/CiBuildRunsResponse';
import type { CiWorkflowBuildRunsLinkagesResponse } from '../models/CiWorkflowBuildRunsLinkagesResponse';
import type { CiWorkflowCreateRequest } from '../models/CiWorkflowCreateRequest';
import type { CiWorkflowRepositoryLinkageResponse } from '../models/CiWorkflowRepositoryLinkageResponse';
import type { CiWorkflowResponse } from '../models/CiWorkflowResponse';
import type { CiWorkflowUpdateRequest } from '../models/CiWorkflowUpdateRequest';
import type { ScmRepositoryResponse } from '../models/ScmRepositoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiWorkflowsService {
    /**
     * @param requestBody CiWorkflow representation
     * @returns CiWorkflowResponse Single CiWorkflow
     * @throws ApiError
     */
    public static ciWorkflowsCreateInstance(
        requestBody: CiWorkflowCreateRequest,
    ): CancelablePromise<CiWorkflowResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/ciWorkflows',
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
     * @param fieldsCiWorkflows the fields to include for returned resources of type ciWorkflows
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param include comma-separated list of relationships to include
     * @returns CiWorkflowResponse Single CiWorkflow
     * @throws ApiError
     */
    public static ciWorkflowsGetInstance(
        id: string,
        fieldsCiWorkflows?: Array<'name' | 'description' | 'branchStartCondition' | 'tagStartCondition' | 'pullRequestStartCondition' | 'scheduledStartCondition' | 'manualBranchStartCondition' | 'manualTagStartCondition' | 'manualPullRequestStartCondition' | 'actions' | 'isEnabled' | 'isLockedForEditing' | 'clean' | 'containerFilePath' | 'lastModifiedDate' | 'product' | 'repository' | 'xcodeVersion' | 'macOsVersion' | 'buildRuns'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        include?: Array<'product' | 'repository' | 'xcodeVersion' | 'macOsVersion'>,
    ): CancelablePromise<CiWorkflowResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciWorkflows/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciWorkflows]': fieldsCiWorkflows,
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
     * @param requestBody CiWorkflow representation
     * @returns CiWorkflowResponse Single CiWorkflow
     * @throws ApiError
     */
    public static ciWorkflowsUpdateInstance(
        id: string,
        requestBody: CiWorkflowUpdateRequest,
    ): CancelablePromise<CiWorkflowResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/ciWorkflows/{id}',
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
    public static ciWorkflowsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/ciWorkflows/{id}',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns CiWorkflowBuildRunsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciWorkflowsBuildRunsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiWorkflowBuildRunsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciWorkflows/{id}/relationships/buildRuns',
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
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsCiBuildRuns the fields to include for returned resources of type ciBuildRuns
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsCiWorkflows the fields to include for returned resources of type ciWorkflows
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param fieldsScmPullRequests the fields to include for returned resources of type scmPullRequests
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns CiBuildRunsResponse List of CiBuildRuns
     * @throws ApiError
     */
    public static ciWorkflowsBuildRunsGetToManyRelated(
        id: string,
        filterBuilds?: Array<string>,
        sort?: Array<'number' | '-number'>,
        fieldsCiBuildRuns?: Array<'number' | 'createdDate' | 'startedDate' | 'finishedDate' | 'sourceCommit' | 'destinationCommit' | 'isPullRequestBuild' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'startReason' | 'cancelReason' | 'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'actions' | 'pullRequest'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsCiWorkflows?: Array<'name' | 'description' | 'branchStartCondition' | 'tagStartCondition' | 'pullRequestStartCondition' | 'scheduledStartCondition' | 'manualBranchStartCondition' | 'manualTagStartCondition' | 'manualPullRequestStartCondition' | 'actions' | 'isEnabled' | 'isLockedForEditing' | 'clean' | 'containerFilePath' | 'lastModifiedDate' | 'product' | 'repository' | 'xcodeVersion' | 'macOsVersion' | 'buildRuns'>,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        fieldsScmPullRequests?: Array<'title' | 'number' | 'webUrl' | 'sourceRepositoryOwner' | 'sourceRepositoryName' | 'sourceBranchName' | 'destinationRepositoryOwner' | 'destinationRepositoryName' | 'destinationBranchName' | 'isClosed' | 'isCrossRepository' | 'repository'>,
        limit?: number,
        include?: Array<'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'pullRequest'>,
        limitBuilds?: number,
    ): CancelablePromise<CiBuildRunsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciWorkflows/{id}/buildRuns',
            path: {
                'id': id,
            },
            query: {
                'filter[builds]': filterBuilds,
                'sort': sort,
                'fields[ciBuildRuns]': fieldsCiBuildRuns,
                'fields[builds]': fieldsBuilds,
                'fields[ciWorkflows]': fieldsCiWorkflows,
                'fields[ciProducts]': fieldsCiProducts,
                'fields[scmGitReferences]': fieldsScmGitReferences,
                'fields[scmPullRequests]': fieldsScmPullRequests,
                'limit': limit,
                'include': include,
                'limit[builds]': limitBuilds,
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
     * @returns CiWorkflowRepositoryLinkageResponse Related linkage
     * @throws ApiError
     */
    public static ciWorkflowsRepositoryGetToOneRelationship(
        id: string,
    ): CancelablePromise<CiWorkflowRepositoryLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciWorkflows/{id}/relationships/repository',
            path: {
                'id': id,
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
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param fieldsScmProviders the fields to include for returned resources of type scmProviders
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param include comma-separated list of relationships to include
     * @returns ScmRepositoryResponse Single ScmRepository
     * @throws ApiError
     */
    public static ciWorkflowsRepositoryGetToOneRelated(
        id: string,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        fieldsScmProviders?: Array<'scmProviderType' | 'url' | 'repositories'>,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        include?: Array<'scmProvider' | 'defaultBranch'>,
    ): CancelablePromise<ScmRepositoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciWorkflows/{id}/repository',
            path: {
                'id': id,
            },
            query: {
                'fields[scmRepositories]': fieldsScmRepositories,
                'fields[scmProviders]': fieldsScmProviders,
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
