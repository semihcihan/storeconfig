/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiArtifactsResponse } from '../models/CiArtifactsResponse';
import type { CiBuildActionArtifactsLinkagesResponse } from '../models/CiBuildActionArtifactsLinkagesResponse';
import type { CiBuildActionBuildRunLinkageResponse } from '../models/CiBuildActionBuildRunLinkageResponse';
import type { CiBuildActionIssuesLinkagesResponse } from '../models/CiBuildActionIssuesLinkagesResponse';
import type { CiBuildActionResponse } from '../models/CiBuildActionResponse';
import type { CiBuildActionTestResultsLinkagesResponse } from '../models/CiBuildActionTestResultsLinkagesResponse';
import type { CiBuildRunResponse } from '../models/CiBuildRunResponse';
import type { CiIssuesResponse } from '../models/CiIssuesResponse';
import type { CiTestResultsResponse } from '../models/CiTestResultsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiBuildActionsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsCiBuildActions the fields to include for returned resources of type ciBuildActions
     * @param fieldsCiBuildRuns the fields to include for returned resources of type ciBuildRuns
     * @param include comma-separated list of relationships to include
     * @returns CiBuildActionResponse Single CiBuildAction
     * @throws ApiError
     */
    public static ciBuildActionsGetInstance(
        id: string,
        fieldsCiBuildActions?: Array<'name' | 'actionType' | 'startedDate' | 'finishedDate' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'isRequiredToPass' | 'buildRun' | 'artifacts' | 'issues' | 'testResults'>,
        fieldsCiBuildRuns?: Array<'number' | 'createdDate' | 'startedDate' | 'finishedDate' | 'sourceCommit' | 'destinationCommit' | 'isPullRequestBuild' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'startReason' | 'cancelReason' | 'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'actions' | 'pullRequest'>,
        include?: Array<'buildRun'>,
    ): CancelablePromise<CiBuildActionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciBuildActions]': fieldsCiBuildActions,
                'fields[ciBuildRuns]': fieldsCiBuildRuns,
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
     * @returns CiBuildActionArtifactsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciBuildActionsArtifactsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiBuildActionArtifactsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/relationships/artifacts',
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
     * @param fieldsCiArtifacts the fields to include for returned resources of type ciArtifacts
     * @param limit maximum resources per page
     * @returns CiArtifactsResponse List of CiArtifacts
     * @throws ApiError
     */
    public static ciBuildActionsArtifactsGetToManyRelated(
        id: string,
        fieldsCiArtifacts?: Array<'fileType' | 'fileName' | 'fileSize' | 'downloadUrl'>,
        limit?: number,
    ): CancelablePromise<CiArtifactsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/artifacts',
            path: {
                'id': id,
            },
            query: {
                'fields[ciArtifacts]': fieldsCiArtifacts,
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
     * @returns CiBuildActionBuildRunLinkageResponse Related linkage
     * @throws ApiError
     */
    public static ciBuildActionsBuildRunGetToOneRelationship(
        id: string,
    ): CancelablePromise<CiBuildActionBuildRunLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/relationships/buildRun',
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
     * @param fieldsCiBuildRuns the fields to include for returned resources of type ciBuildRuns
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsCiWorkflows the fields to include for returned resources of type ciWorkflows
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsScmGitReferences the fields to include for returned resources of type scmGitReferences
     * @param fieldsScmPullRequests the fields to include for returned resources of type scmPullRequests
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns CiBuildRunResponse Single CiBuildRun
     * @throws ApiError
     */
    public static ciBuildActionsBuildRunGetToOneRelated(
        id: string,
        fieldsCiBuildRuns?: Array<'number' | 'createdDate' | 'startedDate' | 'finishedDate' | 'sourceCommit' | 'destinationCommit' | 'isPullRequestBuild' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'startReason' | 'cancelReason' | 'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'actions' | 'pullRequest'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsCiWorkflows?: Array<'name' | 'description' | 'branchStartCondition' | 'tagStartCondition' | 'pullRequestStartCondition' | 'scheduledStartCondition' | 'manualBranchStartCondition' | 'manualTagStartCondition' | 'manualPullRequestStartCondition' | 'actions' | 'isEnabled' | 'isLockedForEditing' | 'clean' | 'containerFilePath' | 'lastModifiedDate' | 'product' | 'repository' | 'xcodeVersion' | 'macOsVersion' | 'buildRuns'>,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsScmGitReferences?: Array<'name' | 'canonicalName' | 'isDeleted' | 'kind' | 'repository'>,
        fieldsScmPullRequests?: Array<'title' | 'number' | 'webUrl' | 'sourceRepositoryOwner' | 'sourceRepositoryName' | 'sourceBranchName' | 'destinationRepositoryOwner' | 'destinationRepositoryName' | 'destinationBranchName' | 'isClosed' | 'isCrossRepository' | 'repository'>,
        include?: Array<'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'pullRequest'>,
        limitBuilds?: number,
    ): CancelablePromise<CiBuildRunResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/buildRun',
            path: {
                'id': id,
            },
            query: {
                'fields[ciBuildRuns]': fieldsCiBuildRuns,
                'fields[builds]': fieldsBuilds,
                'fields[ciWorkflows]': fieldsCiWorkflows,
                'fields[ciProducts]': fieldsCiProducts,
                'fields[scmGitReferences]': fieldsScmGitReferences,
                'fields[scmPullRequests]': fieldsScmPullRequests,
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
     * @param limit maximum resources per page
     * @returns CiBuildActionIssuesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciBuildActionsIssuesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiBuildActionIssuesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/relationships/issues',
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
     * @param fieldsCiIssues the fields to include for returned resources of type ciIssues
     * @param limit maximum resources per page
     * @returns CiIssuesResponse List of CiIssues
     * @throws ApiError
     */
    public static ciBuildActionsIssuesGetToManyRelated(
        id: string,
        fieldsCiIssues?: Array<'issueType' | 'message' | 'fileSource' | 'category'>,
        limit?: number,
    ): CancelablePromise<CiIssuesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/issues',
            path: {
                'id': id,
            },
            query: {
                'fields[ciIssues]': fieldsCiIssues,
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
     * @param limit maximum resources per page
     * @returns CiBuildActionTestResultsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciBuildActionsTestResultsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiBuildActionTestResultsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/relationships/testResults',
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
     * @param fieldsCiTestResults the fields to include for returned resources of type ciTestResults
     * @param limit maximum resources per page
     * @returns CiTestResultsResponse List of CiTestResults
     * @throws ApiError
     */
    public static ciBuildActionsTestResultsGetToManyRelated(
        id: string,
        fieldsCiTestResults?: Array<'className' | 'name' | 'status' | 'fileSource' | 'message' | 'destinationTestResults'>,
        limit?: number,
    ): CancelablePromise<CiTestResultsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildActions/{id}/testResults',
            path: {
                'id': id,
            },
            query: {
                'fields[ciTestResults]': fieldsCiTestResults,
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
}
