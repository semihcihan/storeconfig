/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BuildsWithoutIncludesResponse } from '../models/BuildsWithoutIncludesResponse';
import type { PrereleaseVersionAppLinkageResponse } from '../models/PrereleaseVersionAppLinkageResponse';
import type { PrereleaseVersionBuildsLinkagesResponse } from '../models/PrereleaseVersionBuildsLinkagesResponse';
import type { PrereleaseVersionResponse } from '../models/PrereleaseVersionResponse';
import type { PreReleaseVersionsResponse } from '../models/PreReleaseVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PreReleaseVersionsService {
    /**
     * @param filterBuildsBuildAudienceType filter by attribute 'builds.buildAudienceType'
     * @param filterBuildsExpired filter by attribute 'builds.expired'
     * @param filterBuildsProcessingState filter by attribute 'builds.processingState'
     * @param filterBuildsVersion filter by attribute 'builds.version'
     * @param filterPlatform filter by attribute 'platform'
     * @param filterVersion filter by attribute 'version'
     * @param filterApp filter by id(s) of related 'app'
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns PreReleaseVersionsResponse List of PreReleaseVersions
     * @throws ApiError
     */
    public static preReleaseVersionsGetCollection(
        filterBuildsBuildAudienceType?: Array<'INTERNAL_ONLY' | 'APP_STORE_ELIGIBLE'>,
        filterBuildsExpired?: Array<string>,
        filterBuildsProcessingState?: Array<'PROCESSING' | 'FAILED' | 'INVALID' | 'VALID'>,
        filterBuildsVersion?: Array<string>,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterVersion?: Array<string>,
        filterApp?: Array<string>,
        filterBuilds?: Array<string>,
        sort?: Array<'version' | '-version'>,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'builds' | 'app'>,
        limitBuilds?: number,
    ): CancelablePromise<PreReleaseVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions',
            query: {
                'filter[builds.buildAudienceType]': filterBuildsBuildAudienceType,
                'filter[builds.expired]': filterBuildsExpired,
                'filter[builds.processingState]': filterBuildsProcessingState,
                'filter[builds.version]': filterBuildsVersion,
                'filter[platform]': filterPlatform,
                'filter[version]': filterVersion,
                'filter[app]': filterApp,
                'filter[builds]': filterBuilds,
                'sort': sort,
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[builds]': fieldsBuilds,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[builds]': limitBuilds,
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
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns PrereleaseVersionResponse Single PrereleaseVersion
     * @throws ApiError
     */
    public static preReleaseVersionsGetInstance(
        id: string,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'builds' | 'app'>,
        limitBuilds?: number,
    ): CancelablePromise<PrereleaseVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[builds]': fieldsBuilds,
                'fields[apps]': fieldsApps,
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
     * @returns PrereleaseVersionAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static preReleaseVersionsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<PrereleaseVersionAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions/{id}/relationships/app',
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
     * @param fieldsApps the fields to include for returned resources of type apps
     * @returns AppWithoutIncludesResponse Single App with get
     * @throws ApiError
     */
    public static preReleaseVersionsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions/{id}/app',
            path: {
                'id': id,
            },
            query: {
                'fields[apps]': fieldsApps,
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
     * @returns PrereleaseVersionBuildsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static preReleaseVersionsBuildsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<PrereleaseVersionBuildsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions/{id}/relationships/builds',
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
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @returns BuildsWithoutIncludesResponse List of Builds with get
     * @throws ApiError
     */
    public static preReleaseVersionsBuildsGetToManyRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
    ): CancelablePromise<BuildsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preReleaseVersions/{id}/builds',
            path: {
                'id': id,
            },
            query: {
                'fields[builds]': fieldsBuilds,
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
