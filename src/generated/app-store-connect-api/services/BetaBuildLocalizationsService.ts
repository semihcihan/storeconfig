/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaBuildLocalizationBuildLinkageResponse } from '../models/BetaBuildLocalizationBuildLinkageResponse';
import type { BetaBuildLocalizationCreateRequest } from '../models/BetaBuildLocalizationCreateRequest';
import type { BetaBuildLocalizationResponse } from '../models/BetaBuildLocalizationResponse';
import type { BetaBuildLocalizationsResponse } from '../models/BetaBuildLocalizationsResponse';
import type { BetaBuildLocalizationUpdateRequest } from '../models/BetaBuildLocalizationUpdateRequest';
import type { BuildWithoutIncludesResponse } from '../models/BuildWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaBuildLocalizationsService {
    /**
     * @param filterLocale filter by attribute 'locale'
     * @param filterBuild filter by id(s) of related 'build'
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaBuildLocalizationsResponse List of BetaBuildLocalizations
     * @throws ApiError
     */
    public static betaBuildLocalizationsGetCollection(
        filterLocale?: Array<string>,
        filterBuild?: Array<string>,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
        include?: Array<'build'>,
    ): CancelablePromise<BetaBuildLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaBuildLocalizations',
            query: {
                'filter[locale]': filterLocale,
                'filter[build]': filterBuild,
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
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
     * @param requestBody BetaBuildLocalization representation
     * @returns BetaBuildLocalizationResponse Single BetaBuildLocalization
     * @throws ApiError
     */
    public static betaBuildLocalizationsCreateInstance(
        requestBody: BetaBuildLocalizationCreateRequest,
    ): CancelablePromise<BetaBuildLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaBuildLocalizations',
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
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @returns BetaBuildLocalizationResponse Single BetaBuildLocalization
     * @throws ApiError
     */
    public static betaBuildLocalizationsGetInstance(
        id: string,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'build'>,
    ): CancelablePromise<BetaBuildLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaBuildLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
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
     * @param requestBody BetaBuildLocalization representation
     * @returns BetaBuildLocalizationResponse Single BetaBuildLocalization
     * @throws ApiError
     */
    public static betaBuildLocalizationsUpdateInstance(
        id: string,
        requestBody: BetaBuildLocalizationUpdateRequest,
    ): CancelablePromise<BetaBuildLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaBuildLocalizations/{id}',
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
    public static betaBuildLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaBuildLocalizations/{id}',
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
     * @returns BetaBuildLocalizationBuildLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaBuildLocalizationsBuildGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaBuildLocalizationBuildLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaBuildLocalizations/{id}/relationships/build',
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
    public static betaBuildLocalizationsBuildGetToOneRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
    ): CancelablePromise<BuildWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaBuildLocalizations/{id}/build',
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
