/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildBetaDetailBuildLinkageResponse } from '../models/BuildBetaDetailBuildLinkageResponse';
import type { BuildBetaDetailResponse } from '../models/BuildBetaDetailResponse';
import type { BuildBetaDetailsResponse } from '../models/BuildBetaDetailsResponse';
import type { BuildBetaDetailUpdateRequest } from '../models/BuildBetaDetailUpdateRequest';
import type { BuildResponse } from '../models/BuildResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BuildBetaDetailsService {
    /**
     * @param filterBuild filter by id(s) of related 'build'
     * @param filterId filter by id(s)
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BuildBetaDetailsResponse List of BuildBetaDetails
     * @throws ApiError
     */
    public static buildBetaDetailsGetCollection(
        filterBuild?: Array<string>,
        filterId?: Array<string>,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
        include?: Array<'build'>,
    ): CancelablePromise<BuildBetaDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBetaDetails',
            query: {
                'filter[build]': filterBuild,
                'filter[id]': filterId,
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
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
     * @param id the id of the requested resource
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @returns BuildBetaDetailResponse Single BuildBetaDetail
     * @throws ApiError
     */
    public static buildBetaDetailsGetInstance(
        id: string,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'build'>,
    ): CancelablePromise<BuildBetaDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBetaDetails/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
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
     * @param requestBody BuildBetaDetail representation
     * @returns BuildBetaDetailResponse Single BuildBetaDetail
     * @throws ApiError
     */
    public static buildBetaDetailsUpdateInstance(
        id: string,
        requestBody: BuildBetaDetailUpdateRequest,
    ): CancelablePromise<BuildBetaDetailResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/buildBetaDetails/{id}',
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
     * @returns BuildBetaDetailBuildLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildBetaDetailsBuildGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildBetaDetailBuildLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBetaDetails/{id}/relationships/build',
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
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsBuildIcons the fields to include for returned resources of type buildIcons
     * @param fieldsBuildBundles the fields to include for returned resources of type buildBundles
     * @param include comma-separated list of relationships to include
     * @param limitIndividualTesters maximum number of related individualTesters returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBetaBuildLocalizations maximum number of related betaBuildLocalizations returned (when they are included)
     * @param limitIcons maximum number of related icons returned (when they are included)
     * @param limitBuildBundles maximum number of related buildBundles returned (when they are included)
     * @returns BuildResponse Single Build
     * @throws ApiError
     */
    public static buildBetaDetailsBuildGetToOneRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsBuildIcons?: Array<'iconAsset' | 'iconType' | 'name'>,
        fieldsBuildBundles?: Array<'bundleId' | 'bundleType' | 'sdkBuild' | 'platformBuild' | 'fileName' | 'hasSirikit' | 'hasOnDemandResources' | 'hasPrerenderedIcon' | 'usesLocationServices' | 'isIosBuildMacAppStoreCompatible' | 'includesSymbols' | 'dSYMUrl' | 'supportedArchitectures' | 'requiredCapabilities' | 'deviceProtocols' | 'locales' | 'entitlements' | 'baDownloadAllowance' | 'baMaxInstallSize' | 'appClipDomainCacheStatus' | 'appClipDomainDebugStatus' | 'betaAppClipInvocations' | 'buildBundleFileSizes'>,
        include?: Array<'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles'>,
        limitIndividualTesters?: number,
        limitBetaGroups?: number,
        limitBetaBuildLocalizations?: number,
        limitIcons?: number,
        limitBuildBundles?: number,
    ): CancelablePromise<BuildResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBetaDetails/{id}/build',
            path: {
                'id': id,
            },
            query: {
                'fields[builds]': fieldsBuilds,
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[apps]': fieldsApps,
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[buildIcons]': fieldsBuildIcons,
                'fields[buildBundles]': fieldsBuildBundles,
                'include': include,
                'limit[individualTesters]': limitIndividualTesters,
                'limit[betaGroups]': limitBetaGroups,
                'limit[betaBuildLocalizations]': limitBetaBuildLocalizations,
                'limit[icons]': limitIcons,
                'limit[buildBundles]': limitBuildBundles,
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
