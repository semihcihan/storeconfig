/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppReviewSubmissionBuildLinkageResponse } from '../models/BetaAppReviewSubmissionBuildLinkageResponse';
import type { BetaAppReviewSubmissionCreateRequest } from '../models/BetaAppReviewSubmissionCreateRequest';
import type { BetaAppReviewSubmissionResponse } from '../models/BetaAppReviewSubmissionResponse';
import type { BetaAppReviewSubmissionsResponse } from '../models/BetaAppReviewSubmissionsResponse';
import type { BuildWithoutIncludesResponse } from '../models/BuildWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaAppReviewSubmissionsService {
    /**
     * @param filterBuild filter by id(s) of related 'build'
     * @param filterBetaReviewState filter by attribute 'betaReviewState'
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaAppReviewSubmissionsResponse List of BetaAppReviewSubmissions
     * @throws ApiError
     */
    public static betaAppReviewSubmissionsGetCollection(
        filterBuild: Array<string>,
        filterBetaReviewState?: Array<'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'REJECTED' | 'APPROVED'>,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
        include?: Array<'build'>,
    ): CancelablePromise<BetaAppReviewSubmissionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppReviewSubmissions',
            query: {
                'filter[betaReviewState]': filterBetaReviewState,
                'filter[build]': filterBuild,
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[builds]': fieldsBuilds,
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
     * @param requestBody BetaAppReviewSubmission representation
     * @returns BetaAppReviewSubmissionResponse Single BetaAppReviewSubmission
     * @throws ApiError
     */
    public static betaAppReviewSubmissionsCreateInstance(
        requestBody: BetaAppReviewSubmissionCreateRequest,
    ): CancelablePromise<BetaAppReviewSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaAppReviewSubmissions',
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
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @returns BetaAppReviewSubmissionResponse Single BetaAppReviewSubmission
     * @throws ApiError
     */
    public static betaAppReviewSubmissionsGetInstance(
        id: string,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'build'>,
    ): CancelablePromise<BetaAppReviewSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppReviewSubmissions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[builds]': fieldsBuilds,
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
     * @returns BetaAppReviewSubmissionBuildLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaAppReviewSubmissionsBuildGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaAppReviewSubmissionBuildLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppReviewSubmissions/{id}/relationships/build',
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
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @returns BuildWithoutIncludesResponse Single Build with get
     * @throws ApiError
     */
    public static betaAppReviewSubmissionsBuildGetToOneRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
    ): CancelablePromise<BuildWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppReviewSubmissions/{id}/build',
            path: {
                'id': id,
            },
            query: {
                'fields[builds]': fieldsBuilds,
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
