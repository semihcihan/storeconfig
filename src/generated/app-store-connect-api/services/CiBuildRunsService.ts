/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildsResponse } from '../models/BuildsResponse';
import type { CiBuildActionsResponse } from '../models/CiBuildActionsResponse';
import type { CiBuildRunActionsLinkagesResponse } from '../models/CiBuildRunActionsLinkagesResponse';
import type { CiBuildRunBuildsLinkagesResponse } from '../models/CiBuildRunBuildsLinkagesResponse';
import type { CiBuildRunCreateRequest } from '../models/CiBuildRunCreateRequest';
import type { CiBuildRunResponse } from '../models/CiBuildRunResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiBuildRunsService {
    /**
     * @param requestBody CiBuildRun representation
     * @returns CiBuildRunResponse Single CiBuildRun
     * @throws ApiError
     */
    public static ciBuildRunsCreateInstance(
        requestBody: CiBuildRunCreateRequest,
    ): CancelablePromise<CiBuildRunResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/ciBuildRuns',
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
     * @param fieldsCiBuildRuns the fields to include for returned resources of type ciBuildRuns
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns CiBuildRunResponse Single CiBuildRun
     * @throws ApiError
     */
    public static ciBuildRunsGetInstance(
        id: string,
        fieldsCiBuildRuns?: Array<'number' | 'createdDate' | 'startedDate' | 'finishedDate' | 'sourceCommit' | 'destinationCommit' | 'isPullRequestBuild' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'startReason' | 'cancelReason' | 'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'actions' | 'pullRequest'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'pullRequest'>,
        limitBuilds?: number,
    ): CancelablePromise<CiBuildRunResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildRuns/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciBuildRuns]': fieldsCiBuildRuns,
                'fields[builds]': fieldsBuilds,
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
     * @returns CiBuildRunActionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciBuildRunsActionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiBuildRunActionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildRuns/{id}/relationships/actions',
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
     * @param fieldsCiBuildActions the fields to include for returned resources of type ciBuildActions
     * @param fieldsCiBuildRuns the fields to include for returned resources of type ciBuildRuns
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns CiBuildActionsResponse List of CiBuildActions
     * @throws ApiError
     */
    public static ciBuildRunsActionsGetToManyRelated(
        id: string,
        fieldsCiBuildActions?: Array<'name' | 'actionType' | 'startedDate' | 'finishedDate' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'isRequiredToPass' | 'buildRun' | 'artifacts' | 'issues' | 'testResults'>,
        fieldsCiBuildRuns?: Array<'number' | 'createdDate' | 'startedDate' | 'finishedDate' | 'sourceCommit' | 'destinationCommit' | 'isPullRequestBuild' | 'issueCounts' | 'executionProgress' | 'completionStatus' | 'startReason' | 'cancelReason' | 'builds' | 'workflow' | 'product' | 'sourceBranchOrTag' | 'destinationBranch' | 'actions' | 'pullRequest'>,
        limit?: number,
        include?: Array<'buildRun'>,
    ): CancelablePromise<CiBuildActionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildRuns/{id}/actions',
            path: {
                'id': id,
            },
            query: {
                'fields[ciBuildActions]': fieldsCiBuildActions,
                'fields[ciBuildRuns]': fieldsCiBuildRuns,
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
     * @returns CiBuildRunBuildsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciBuildRunsBuildsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiBuildRunBuildsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildRuns/{id}/relationships/builds',
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
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsBetaBuildLocalizations the fields to include for returned resources of type betaBuildLocalizations
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsBetaAppReviewSubmissions the fields to include for returned resources of type betaAppReviewSubmissions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuildBetaDetails the fields to include for returned resources of type buildBetaDetails
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsBuildIcons the fields to include for returned resources of type buildIcons
     * @param fieldsBuildBundles the fields to include for returned resources of type buildBundles
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitIndividualTesters maximum number of related individualTesters returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBetaBuildLocalizations maximum number of related betaBuildLocalizations returned (when they are included)
     * @param limitIcons maximum number of related icons returned (when they are included)
     * @param limitBuildBundles maximum number of related buildBundles returned (when they are included)
     * @returns BuildsResponse List of Builds
     * @throws ApiError
     */
    public static ciBuildRunsBuildsGetToManyRelated(
        id: string,
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
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsBetaBuildLocalizations?: Array<'whatsNew' | 'locale' | 'build'>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsBetaAppReviewSubmissions?: Array<'betaReviewState' | 'submittedDate' | 'build'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuildBetaDetails?: Array<'autoNotifyEnabled' | 'internalBuildState' | 'externalBuildState' | 'build'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsBuildIcons?: Array<'iconAsset' | 'iconType' | 'name'>,
        fieldsBuildBundles?: Array<'bundleId' | 'bundleType' | 'sdkBuild' | 'platformBuild' | 'fileName' | 'hasSirikit' | 'hasOnDemandResources' | 'hasPrerenderedIcon' | 'usesLocationServices' | 'isIosBuildMacAppStoreCompatible' | 'includesSymbols' | 'dSYMUrl' | 'supportedArchitectures' | 'requiredCapabilities' | 'deviceProtocols' | 'locales' | 'entitlements' | 'baDownloadAllowance' | 'baMaxInstallSize' | 'appClipDomainCacheStatus' | 'appClipDomainDebugStatus' | 'betaAppClipInvocations' | 'buildBundleFileSizes'>,
        limit?: number,
        include?: Array<'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles'>,
        limitIndividualTesters?: number,
        limitBetaGroups?: number,
        limitBetaBuildLocalizations?: number,
        limitIcons?: number,
        limitBuildBundles?: number,
    ): CancelablePromise<BuildsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciBuildRuns/{id}/builds',
            path: {
                'id': id,
            },
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
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[betaBuildLocalizations]': fieldsBetaBuildLocalizations,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[betaAppReviewSubmissions]': fieldsBetaAppReviewSubmissions,
                'fields[apps]': fieldsApps,
                'fields[buildBetaDetails]': fieldsBuildBetaDetails,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[buildIcons]': fieldsBuildIcons,
                'fields[buildBundles]': fieldsBuildBundles,
                'limit': limit,
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
