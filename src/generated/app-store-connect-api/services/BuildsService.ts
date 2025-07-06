/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEncryptionDeclarationWithoutIncludesResponse } from '../models/AppEncryptionDeclarationWithoutIncludesResponse';
import type { AppStoreVersionResponse } from '../models/AppStoreVersionResponse';
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BetaAppReviewSubmissionWithoutIncludesResponse } from '../models/BetaAppReviewSubmissionWithoutIncludesResponse';
import type { BetaBuildLocalizationsWithoutIncludesResponse } from '../models/BetaBuildLocalizationsWithoutIncludesResponse';
import type { BetaBuildUsagesV1MetricResponse } from '../models/BetaBuildUsagesV1MetricResponse';
import type { BetaTestersWithoutIncludesResponse } from '../models/BetaTestersWithoutIncludesResponse';
import type { BuildAppEncryptionDeclarationLinkageRequest } from '../models/BuildAppEncryptionDeclarationLinkageRequest';
import type { BuildAppEncryptionDeclarationLinkageResponse } from '../models/BuildAppEncryptionDeclarationLinkageResponse';
import type { BuildAppLinkageResponse } from '../models/BuildAppLinkageResponse';
import type { BuildAppStoreVersionLinkageResponse } from '../models/BuildAppStoreVersionLinkageResponse';
import type { BuildBetaAppReviewSubmissionLinkageResponse } from '../models/BuildBetaAppReviewSubmissionLinkageResponse';
import type { BuildBetaBuildLocalizationsLinkagesResponse } from '../models/BuildBetaBuildLocalizationsLinkagesResponse';
import type { BuildBetaDetailResponse } from '../models/BuildBetaDetailResponse';
import type { BuildBetaGroupsLinkagesRequest } from '../models/BuildBetaGroupsLinkagesRequest';
import type { BuildBuildBetaDetailLinkageResponse } from '../models/BuildBuildBetaDetailLinkageResponse';
import type { BuildDiagnosticSignaturesLinkagesResponse } from '../models/BuildDiagnosticSignaturesLinkagesResponse';
import type { BuildIconsLinkagesResponse } from '../models/BuildIconsLinkagesResponse';
import type { BuildIconsWithoutIncludesResponse } from '../models/BuildIconsWithoutIncludesResponse';
import type { BuildIndividualTestersLinkagesRequest } from '../models/BuildIndividualTestersLinkagesRequest';
import type { BuildIndividualTestersLinkagesResponse } from '../models/BuildIndividualTestersLinkagesResponse';
import type { BuildPreReleaseVersionLinkageResponse } from '../models/BuildPreReleaseVersionLinkageResponse';
import type { BuildResponse } from '../models/BuildResponse';
import type { BuildsResponse } from '../models/BuildsResponse';
import type { BuildUpdateRequest } from '../models/BuildUpdateRequest';
import type { DiagnosticSignaturesResponse } from '../models/DiagnosticSignaturesResponse';
import type { PrereleaseVersionWithoutIncludesResponse } from '../models/PrereleaseVersionWithoutIncludesResponse';
import type { xcodeMetrics } from '../models/xcodeMetrics';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BuildsService {
    /**
     * @param filterVersion filter by attribute 'version'
     * @param filterExpired filter by attribute 'expired'
     * @param filterProcessingState filter by attribute 'processingState'
     * @param filterBetaAppReviewSubmissionBetaReviewState filter by attribute 'betaAppReviewSubmission.betaReviewState'
     * @param filterUsesNonExemptEncryption filter by attribute 'usesNonExemptEncryption'
     * @param filterPreReleaseVersionVersion filter by attribute 'preReleaseVersion.version'
     * @param filterPreReleaseVersionPlatform filter by attribute 'preReleaseVersion.platform'
     * @param filterBuildAudienceType filter by attribute 'buildAudienceType'
     * @param filterPreReleaseVersion filter by id(s) of related 'preReleaseVersion'
     * @param filterApp filter by id(s) of related 'app'
     * @param filterBetaGroups filter by id(s) of related 'betaGroups'
     * @param filterAppStoreVersion filter by id(s) of related 'appStoreVersion'
     * @param filterId filter by id(s)
     * @param existsUsesNonExemptEncryption filter by attribute 'usesNonExemptEncryption'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsBuildIcons the fields to include for returned resources of type buildIcons
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBetaBuildLocalizations maximum number of related betaBuildLocalizations returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuildBundles maximum number of related buildBundles returned (when they are included)
     * @param limitIcons maximum number of related icons returned (when they are included)
     * @param limitIndividualTesters maximum number of related individualTesters returned (when they are included)
     * @returns BuildsResponse List of Builds
     * @throws ApiError
     */
    public static buildsGetCollection(
        filterVersion?: Array<string>,
        filterExpired?: Array<string>,
        filterProcessingState?: Array<'PROCESSING' | 'FAILED' | 'INVALID' | 'VALID'>,
        filterBetaAppReviewSubmissionBetaReviewState?: Array<'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'REJECTED' | 'APPROVED'>,
        filterUsesNonExemptEncryption?: Array<string>,
        filterPreReleaseVersionVersion?: Array<string>,
        filterPreReleaseVersionPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterBuildAudienceType?: Array<'INTERNAL_ONLY' | 'APP_STORE_ELIGIBLE'>,
        filterPreReleaseVersion?: Array<string>,
        filterApp?: Array<string>,
        filterBetaGroups?: Array<string>,
        filterAppStoreVersion?: Array<string>,
        filterId?: Array<string>,
        existsUsesNonExemptEncryption?: boolean,
        sort?: Array<'version' | '-version' | 'uploadedDate' | '-uploadedDate' | 'preReleaseVersion' | '-preReleaseVersion'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsBuildIcons?: Array<'iconAsset' | 'iconType' | 'name'>,
        limit?: number,
        include?: Array<'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles'>,
        limitBetaBuildLocalizations?: number,
        limitBetaGroups?: number,
        limitBuildBundles?: number,
        limitIcons?: number,
        limitIndividualTesters?: number,
    ): CancelablePromise<BuildsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds',
            query: {
                'filter[version]': filterVersion,
                'filter[expired]': filterExpired,
                'filter[processingState]': filterProcessingState,
                'filter[betaAppReviewSubmission.betaReviewState]': filterBetaAppReviewSubmissionBetaReviewState,
                'filter[usesNonExemptEncryption]': filterUsesNonExemptEncryption,
                'filter[preReleaseVersion.version]': filterPreReleaseVersionVersion,
                'filter[preReleaseVersion.platform]': filterPreReleaseVersionPlatform,
                'filter[buildAudienceType]': filterBuildAudienceType,
                'filter[preReleaseVersion]': filterPreReleaseVersion,
                'filter[app]': filterApp,
                'filter[betaGroups]': filterBetaGroups,
                'filter[appStoreVersion]': filterAppStoreVersion,
                'filter[id]': filterId,
                'exists[usesNonExemptEncryption]': existsUsesNonExemptEncryption,
                'sort': sort,
                'fields[builds]': fieldsBuilds,
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[apps]': fieldsApps,
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[buildIcons]': fieldsBuildIcons,
                'limit': limit,
                'include': include,
                'limit[betaBuildLocalizations]': limitBetaBuildLocalizations,
                'limit[betaGroups]': limitBetaGroups,
                'limit[buildBundles]': limitBuildBundles,
                'limit[icons]': limitIcons,
                'limit[individualTesters]': limitIndividualTesters,
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
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsBuildIcons the fields to include for returned resources of type buildIcons
     * @param include comma-separated list of relationships to include
     * @param limitBetaBuildLocalizations maximum number of related betaBuildLocalizations returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuildBundles maximum number of related buildBundles returned (when they are included)
     * @param limitIcons maximum number of related icons returned (when they are included)
     * @param limitIndividualTesters maximum number of related individualTesters returned (when they are included)
     * @returns BuildResponse Single Build
     * @throws ApiError
     */
    public static buildsGetInstance(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsBuildIcons?: Array<'iconAsset' | 'iconType' | 'name'>,
        include?: Array<'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles'>,
        limitBetaBuildLocalizations?: number,
        limitBetaGroups?: number,
        limitBuildBundles?: number,
        limitIcons?: number,
        limitIndividualTesters?: number,
    ): CancelablePromise<BuildResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[builds]': fieldsBuilds,
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[apps]': fieldsApps,
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[buildIcons]': fieldsBuildIcons,
                'include': include,
                'limit[betaBuildLocalizations]': limitBetaBuildLocalizations,
                'limit[betaGroups]': limitBetaGroups,
                'limit[buildBundles]': limitBuildBundles,
                'limit[icons]': limitIcons,
                'limit[individualTesters]': limitIndividualTesters,
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
     * @param requestBody Build representation
     * @returns BuildResponse Single Build
     * @throws ApiError
     */
    public static buildsUpdateInstance(
        id: string,
        requestBody: BuildUpdateRequest,
    ): CancelablePromise<BuildResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/builds/{id}',
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
     * @returns BuildAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/app',
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
    public static buildsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/app',
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
     * @returns BuildAppEncryptionDeclarationLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsAppEncryptionDeclarationGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildAppEncryptionDeclarationLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/appEncryptionDeclaration',
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
     * @param requestBody Related linkage
     * @returns void
     * @throws ApiError
     */
    public static buildsAppEncryptionDeclarationUpdateToOneRelationship(
        id: string,
        requestBody: BuildAppEncryptionDeclarationLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/builds/{id}/relationships/appEncryptionDeclaration',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @returns AppEncryptionDeclarationWithoutIncludesResponse Single AppEncryptionDeclaration with get
     * @throws ApiError
     */
    public static buildsAppEncryptionDeclarationGetToOneRelated(
        id: string,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
    ): CancelablePromise<AppEncryptionDeclarationWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/appEncryptionDeclaration',
            path: {
                'id': id,
            },
            query: {
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
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
     * @returns BuildAppStoreVersionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsAppStoreVersionGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildAppStoreVersionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/appStoreVersion',
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
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAgeRatingDeclarations the fields to include for returned resources of type ageRatingDeclarations
     * @param fieldsAppStoreVersionLocalizations the fields to include for returned resources of type appStoreVersionLocalizations
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsAppStoreVersionPhasedReleases the fields to include for returned resources of type appStoreVersionPhasedReleases
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsRoutingAppCoverages the fields to include for returned resources of type routingAppCoverages
     * @param fieldsAppStoreReviewDetails the fields to include for returned resources of type appStoreReviewDetails
     * @param fieldsAppStoreVersionSubmissions the fields to include for returned resources of type appStoreVersionSubmissions
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAlternativeDistributionPackages the fields to include for returned resources of type alternativeDistributionPackages
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionLocalizations maximum number of related appStoreVersionLocalizations returned (when they are included)
     * @param limitAppStoreVersionExperiments maximum number of related appStoreVersionExperiments returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @returns AppStoreVersionResponse Single AppStoreVersion
     * @throws ApiError
     */
    public static buildsAppStoreVersionGetToOneRelated(
        id: string,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAgeRatingDeclarations?: Array<'alcoholTobaccoOrDrugUseOrReferences' | 'contests' | 'gambling' | 'gamblingSimulated' | 'kidsAgeBand' | 'lootBox' | 'medicalOrTreatmentInformation' | 'profanityOrCrudeHumor' | 'sexualContentGraphicAndNudity' | 'sexualContentOrNudity' | 'horrorOrFearThemes' | 'matureOrSuggestiveThemes' | 'unrestrictedWebAccess' | 'violenceCartoonOrFantasy' | 'violenceRealisticProlongedGraphicOrSadistic' | 'violenceRealistic' | 'koreaAgeRatingOverride'>,
        fieldsAppStoreVersionLocalizations?: Array<'description' | 'locale' | 'keywords' | 'marketingUrl' | 'promotionalText' | 'supportUrl' | 'whatsNew' | 'appStoreVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsAppStoreVersionPhasedReleases?: Array<'phasedReleaseState' | 'startDate' | 'totalPauseDuration' | 'currentDayNumber'>,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsRoutingAppCoverages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreVersion'>,
        fieldsAppStoreReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'appStoreVersion' | 'appStoreReviewAttachments'>,
        fieldsAppStoreVersionSubmissions?: Array<'appStoreVersion'>,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments' | 'platform' | 'app' | 'latestControlVersion' | 'controlVersions'>,
        fieldsAlternativeDistributionPackages?: Array<'versions'>,
        include?: Array<'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionPackage'>,
        limitAppStoreVersionLocalizations?: number,
        limitAppStoreVersionExperiments?: number,
        limitAppStoreVersionExperimentsV2?: number,
    ): CancelablePromise<AppStoreVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/appStoreVersion',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[apps]': fieldsApps,
                'fields[ageRatingDeclarations]': fieldsAgeRatingDeclarations,
                'fields[appStoreVersionLocalizations]': fieldsAppStoreVersionLocalizations,
                'fields[builds]': fieldsBuilds,
                'fields[appStoreVersionPhasedReleases]': fieldsAppStoreVersionPhasedReleases,
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[routingAppCoverages]': fieldsRoutingAppCoverages,
                'fields[appStoreReviewDetails]': fieldsAppStoreReviewDetails,
                'fields[appStoreVersionSubmissions]': fieldsAppStoreVersionSubmissions,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[alternativeDistributionPackages]': fieldsAlternativeDistributionPackages,
                'include': include,
                'limit[appStoreVersionLocalizations]': limitAppStoreVersionLocalizations,
                'limit[appStoreVersionExperiments]': limitAppStoreVersionExperiments,
                'limit[appStoreVersionExperimentsV2]': limitAppStoreVersionExperimentsV2,
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
     * @returns BuildBetaAppReviewSubmissionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsBetaAppReviewSubmissionGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildBetaAppReviewSubmissionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/betaAppReviewSubmission',
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
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @returns BetaAppReviewSubmissionWithoutIncludesResponse Single BetaAppReviewSubmission with get
     * @throws ApiError
     */
    public static buildsBetaAppReviewSubmissionGetToOneRelated(
        id: string,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
    ): CancelablePromise<BetaAppReviewSubmissionWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/betaAppReviewSubmission',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
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
     * @returns BuildBetaBuildLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildsBetaBuildLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildBetaBuildLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/betaBuildLocalizations',
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
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param limit maximum resources per page
     * @returns BetaBuildLocalizationsWithoutIncludesResponse List of BetaBuildLocalizations with get
     * @throws ApiError
     */
    public static buildsBetaBuildLocalizationsGetToManyRelated(
        id: string,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        limit?: number,
    ): CancelablePromise<BetaBuildLocalizationsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/betaBuildLocalizations',
            path: {
                'id': id,
            },
            query: {
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static buildsBetaGroupsCreateToManyRelationship(
        id: string,
        requestBody: BuildBetaGroupsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/builds/{id}/relationships/betaGroups',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static buildsBetaGroupsDeleteToManyRelationship(
        id: string,
        requestBody: BuildBetaGroupsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/builds/{id}/relationships/betaGroups',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @returns BuildBuildBetaDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsBuildBetaDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildBuildBetaDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/buildBetaDetail',
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
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @returns BuildBetaDetailResponse Single BuildBetaDetail
     * @throws ApiError
     */
    public static buildsBuildBetaDetailGetToOneRelated(
        id: string,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'build'>,
    ): CancelablePromise<BuildBetaDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/buildBetaDetail',
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
     * @param limit maximum resources per page
     * @returns BuildDiagnosticSignaturesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildsDiagnosticSignaturesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildDiagnosticSignaturesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/diagnosticSignatures',
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
     * @param filterDiagnosticType filter by attribute 'diagnosticType'
     * @param fieldsDiagnosticSignatures the fields to include for returned resources of type diagnosticSignatures
     * @param limit maximum resources per page
     * @returns DiagnosticSignaturesResponse List of DiagnosticSignatures
     * @throws ApiError
     */
    public static buildsDiagnosticSignaturesGetToManyRelated(
        id: string,
        filterDiagnosticType?: Array<'DISK_WRITES' | 'HANGS' | 'LAUNCHES'>,
        fieldsDiagnosticSignatures?: Array<'diagnosticType' | 'signature' | 'weight' | 'insight' | 'logs'>,
        limit?: number,
    ): CancelablePromise<DiagnosticSignaturesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/diagnosticSignatures',
            path: {
                'id': id,
            },
            query: {
                'filter[diagnosticType]': filterDiagnosticType,
                'fields[diagnosticSignatures]': fieldsDiagnosticSignatures,
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
     * @returns BuildIconsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildsIconsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildIconsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/icons',
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
     * @param fieldsBuildIcons the fields to include for returned resources of type buildIcons
     * @param limit maximum resources per page
     * @returns BuildIconsWithoutIncludesResponse List of BuildIcons with get
     * @throws ApiError
     */
    public static buildsIconsGetToManyRelated(
        id: string,
        fieldsBuildIcons?: Array<'iconAsset' | 'iconType' | 'name'>,
        limit?: number,
    ): CancelablePromise<BuildIconsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/icons',
            path: {
                'id': id,
            },
            query: {
                'fields[buildIcons]': fieldsBuildIcons,
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
     * @returns BuildIndividualTestersLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildsIndividualTestersGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildIndividualTestersLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/individualTesters',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static buildsIndividualTestersCreateToManyRelationship(
        id: string,
        requestBody: BuildIndividualTestersLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/builds/{id}/relationships/individualTesters',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static buildsIndividualTestersDeleteToManyRelationship(
        id: string,
        requestBody: BuildIndividualTestersLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/builds/{id}/relationships/individualTesters',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param limit maximum resources per page
     * @returns BetaTestersWithoutIncludesResponse List of BetaTesters with get
     * @throws ApiError
     */
    public static buildsIndividualTestersGetToManyRelated(
        id: string,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        limit?: number,
    ): CancelablePromise<BetaTestersWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/individualTesters',
            path: {
                'id': id,
            },
            query: {
                'fields[betaTesters]': fieldsBetaTesters,
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterMetricType filter by attribute 'metricType'
     * @param filterDeviceType filter by attribute 'deviceType'
     * @returns xcodeMetrics List of PerfPowerMetrics
     * @throws ApiError
     */
    public static buildsPerfPowerMetricsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS'>,
        filterMetricType?: Array<'DISK' | 'HANG' | 'BATTERY' | 'LAUNCH' | 'MEMORY' | 'ANIMATION' | 'TERMINATION'>,
        filterDeviceType?: Array<string>,
    ): CancelablePromise<xcodeMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/perfPowerMetrics',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[metricType]': filterMetricType,
                'filter[deviceType]': filterDeviceType,
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
     * @returns BuildPreReleaseVersionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildsPreReleaseVersionGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildPreReleaseVersionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/relationships/preReleaseVersion',
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
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @returns PrereleaseVersionWithoutIncludesResponse Single PrereleaseVersion with get
     * @throws ApiError
     */
    public static buildsPreReleaseVersionGetToOneRelated(
        id: string,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
    ): CancelablePromise<PrereleaseVersionWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/preReleaseVersion',
            path: {
                'id': id,
            },
            query: {
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
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
     * @param limit maximum number of groups to return per page
     * @returns BetaBuildUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static buildsBetaBuildUsagesGetMetrics(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaBuildUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/metrics/betaBuildUsages',
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
}
