/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppResponse } from '../models/AppResponse';
import type { CiBuildRunsResponse } from '../models/CiBuildRunsResponse';
import type { CiProductAdditionalRepositoriesLinkagesResponse } from '../models/CiProductAdditionalRepositoriesLinkagesResponse';
import type { CiProductAppLinkageResponse } from '../models/CiProductAppLinkageResponse';
import type { CiProductBuildRunsLinkagesResponse } from '../models/CiProductBuildRunsLinkagesResponse';
import type { CiProductPrimaryRepositoriesLinkagesResponse } from '../models/CiProductPrimaryRepositoriesLinkagesResponse';
import type { CiProductResponse } from '../models/CiProductResponse';
import type { CiProductsResponse } from '../models/CiProductsResponse';
import type { CiProductWorkflowsLinkagesResponse } from '../models/CiProductWorkflowsLinkagesResponse';
import type { CiWorkflowsResponse } from '../models/CiWorkflowsResponse';
import type { ScmRepositoriesResponse } from '../models/ScmRepositoriesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiProductsService {
    /**
     * @param filterProductType filter by attribute 'productType'
     * @param filterApp filter by id(s) of related 'app'
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitPrimaryRepositories maximum number of related primaryRepositories returned (when they are included)
     * @returns CiProductsResponse List of CiProducts
     * @throws ApiError
     */
    public static ciProductsGetCollection(
        filterProductType?: Array<'APP' | 'FRAMEWORK'>,
        filterApp?: Array<string>,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        limit?: number,
        include?: Array<'app' | 'bundleId' | 'primaryRepositories'>,
        limitPrimaryRepositories?: number,
    ): CancelablePromise<CiProductsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts',
            query: {
                'filter[productType]': filterProductType,
                'filter[app]': filterApp,
                'fields[ciProducts]': fieldsCiProducts,
                'fields[apps]': fieldsApps,
                'fields[scmRepositories]': fieldsScmRepositories,
                'limit': limit,
                'include': include,
                'limit[primaryRepositories]': limitPrimaryRepositories,
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
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param include comma-separated list of relationships to include
     * @param limitPrimaryRepositories maximum number of related primaryRepositories returned (when they are included)
     * @returns CiProductResponse Single CiProduct
     * @throws ApiError
     */
    public static ciProductsGetInstance(
        id: string,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        include?: Array<'app' | 'bundleId' | 'primaryRepositories'>,
        limitPrimaryRepositories?: number,
    ): CancelablePromise<CiProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciProducts]': fieldsCiProducts,
                'fields[apps]': fieldsApps,
                'fields[scmRepositories]': fieldsScmRepositories,
                'include': include,
                'limit[primaryRepositories]': limitPrimaryRepositories,
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
     * @returns void
     * @throws ApiError
     */
    public static ciProductsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/ciProducts/{id}',
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
     * @returns CiProductAdditionalRepositoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciProductsAdditionalRepositoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiProductAdditionalRepositoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/relationships/additionalRepositories',
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
    public static ciProductsAdditionalRepositoriesGetToManyRelated(
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
            url: '/v1/ciProducts/{id}/additionalRepositories',
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
    /**
     * @param id the id of the requested resource
     * @returns CiProductAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static ciProductsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<CiProductAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/relationships/app',
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
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param fieldsBetaAppLocalizations the fields to include for returned resources of type betaAppLocalizations
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsBetaLicenseAgreements the fields to include for returned resources of type betaLicenseAgreements
     * @param fieldsBetaAppReviewDetails the fields to include for returned resources of type betaAppReviewDetails
     * @param fieldsAppInfos the fields to include for returned resources of type appInfos
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsEndUserLicenseAgreements the fields to include for returned resources of type endUserLicenseAgreements
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsSubscriptionGroups the fields to include for returned resources of type subscriptionGroups
     * @param fieldsGameCenterEnabledVersions the fields to include for returned resources of type gameCenterEnabledVersions
     * @param fieldsAppCustomProductPages the fields to include for returned resources of type appCustomProductPages
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsAppEvents the fields to include for returned resources of type appEvents
     * @param fieldsReviewSubmissions the fields to include for returned resources of type reviewSubmissions
     * @param fieldsSubscriptionGracePeriods the fields to include for returned resources of type subscriptionGracePeriods
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param include comma-separated list of relationships to include
     * @param limitAppEncryptionDeclarations maximum number of related appEncryptionDeclarations returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitAppStoreVersions maximum number of related appStoreVersions returned (when they are included)
     * @param limitPreReleaseVersions maximum number of related preReleaseVersions returned (when they are included)
     * @param limitBetaAppLocalizations maximum number of related betaAppLocalizations returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @param limitAppInfos maximum number of related appInfos returned (when they are included)
     * @param limitAppClips maximum number of related appClips returned (when they are included)
     * @param limitInAppPurchases maximum number of related inAppPurchases returned (when they are included)
     * @param limitSubscriptionGroups maximum number of related subscriptionGroups returned (when they are included)
     * @param limitGameCenterEnabledVersions maximum number of related gameCenterEnabledVersions returned (when they are included)
     * @param limitAppCustomProductPages maximum number of related appCustomProductPages returned (when they are included)
     * @param limitInAppPurchasesV2 maximum number of related inAppPurchasesV2 returned (when they are included)
     * @param limitPromotedPurchases maximum number of related promotedPurchases returned (when they are included)
     * @param limitAppEvents maximum number of related appEvents returned (when they are included)
     * @param limitReviewSubmissions maximum number of related reviewSubmissions returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @returns AppResponse Single App
     * @throws ApiError
     */
    public static ciProductsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        fieldsBetaAppLocalizations?: Array<'feedbackEmail' | 'marketingUrl' | 'privacyPolicyUrl' | 'tvOsPrivacyPolicy' | 'description' | 'locale' | 'app'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsBetaLicenseAgreements?: Array<'agreementText' | 'app'>,
        fieldsBetaAppReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'app'>,
        fieldsAppInfos?: Array<'appStoreState' | 'state' | 'appStoreAgeRating' | 'australiaAgeRating' | 'brazilAgeRating' | 'brazilAgeRatingV2' | 'franceAgeRating' | 'koreaAgeRating' | 'kidsAgeBand' | 'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsEndUserLicenseAgreements?: Array<'agreementText' | 'app' | 'territories'>,
        fieldsInAppPurchases?: Array<'referenceName' | 'productId' | 'inAppPurchaseType' | 'state' | 'apps' | 'name' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsSubscriptionGroups?: Array<'referenceName' | 'subscriptions' | 'subscriptionGroupLocalizations'>,
        fieldsGameCenterEnabledVersions?: Array<'platform' | 'versionString' | 'iconAsset' | 'compatibleVersions' | 'app'>,
        fieldsAppCustomProductPages?: Array<'name' | 'url' | 'visible' | 'app' | 'appCustomProductPageVersions'>,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsAppEvents?: Array<'referenceName' | 'badge' | 'eventState' | 'deepLink' | 'purchaseRequirement' | 'primaryLocale' | 'priority' | 'purpose' | 'territorySchedules' | 'archivedTerritorySchedules' | 'localizations'>,
        fieldsReviewSubmissions?: Array<'platform' | 'submittedDate' | 'state' | 'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        fieldsSubscriptionGracePeriods?: Array<'optIn' | 'sandboxOptIn' | 'duration' | 'renewalType'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'platform' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'app' | 'latestControlVersion' | 'controlVersions' | 'appStoreVersionExperimentTreatments'>,
        include?: Array<'appEncryptionDeclarations' | 'ciProduct' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'endUserLicenseAgreement' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2'>,
        limitAppEncryptionDeclarations?: number,
        limitBetaGroups?: number,
        limitAppStoreVersions?: number,
        limitPreReleaseVersions?: number,
        limitBetaAppLocalizations?: number,
        limitBuilds?: number,
        limitAppInfos?: number,
        limitAppClips?: number,
        limitInAppPurchases?: number,
        limitSubscriptionGroups?: number,
        limitGameCenterEnabledVersions?: number,
        limitAppCustomProductPages?: number,
        limitInAppPurchasesV2?: number,
        limitPromotedPurchases?: number,
        limitAppEvents?: number,
        limitReviewSubmissions?: number,
        limitAppStoreVersionExperimentsV2?: number,
    ): CancelablePromise<AppResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/app',
            path: {
                'id': id,
            },
            query: {
                'fields[apps]': fieldsApps,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[ciProducts]': fieldsCiProducts,
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
                'fields[betaAppLocalizations]': fieldsBetaAppLocalizations,
                'fields[builds]': fieldsBuilds,
                'fields[betaLicenseAgreements]': fieldsBetaLicenseAgreements,
                'fields[betaAppReviewDetails]': fieldsBetaAppReviewDetails,
                'fields[appInfos]': fieldsAppInfos,
                'fields[appClips]': fieldsAppClips,
                'fields[endUserLicenseAgreements]': fieldsEndUserLicenseAgreements,
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[subscriptionGroups]': fieldsSubscriptionGroups,
                'fields[gameCenterEnabledVersions]': fieldsGameCenterEnabledVersions,
                'fields[appCustomProductPages]': fieldsAppCustomProductPages,
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[appEvents]': fieldsAppEvents,
                'fields[reviewSubmissions]': fieldsReviewSubmissions,
                'fields[subscriptionGracePeriods]': fieldsSubscriptionGracePeriods,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'include': include,
                'limit[appEncryptionDeclarations]': limitAppEncryptionDeclarations,
                'limit[betaGroups]': limitBetaGroups,
                'limit[appStoreVersions]': limitAppStoreVersions,
                'limit[preReleaseVersions]': limitPreReleaseVersions,
                'limit[betaAppLocalizations]': limitBetaAppLocalizations,
                'limit[builds]': limitBuilds,
                'limit[appInfos]': limitAppInfos,
                'limit[appClips]': limitAppClips,
                'limit[inAppPurchases]': limitInAppPurchases,
                'limit[subscriptionGroups]': limitSubscriptionGroups,
                'limit[gameCenterEnabledVersions]': limitGameCenterEnabledVersions,
                'limit[appCustomProductPages]': limitAppCustomProductPages,
                'limit[inAppPurchasesV2]': limitInAppPurchasesV2,
                'limit[promotedPurchases]': limitPromotedPurchases,
                'limit[appEvents]': limitAppEvents,
                'limit[reviewSubmissions]': limitReviewSubmissions,
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
     * @param limit maximum resources per page
     * @returns CiProductBuildRunsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciProductsBuildRunsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiProductBuildRunsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/relationships/buildRuns',
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
    public static ciProductsBuildRunsGetToManyRelated(
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
            url: '/v1/ciProducts/{id}/buildRuns',
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
     * @param limit maximum resources per page
     * @returns CiProductPrimaryRepositoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciProductsPrimaryRepositoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiProductPrimaryRepositoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/relationships/primaryRepositories',
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
    public static ciProductsPrimaryRepositoriesGetToManyRelated(
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
            url: '/v1/ciProducts/{id}/primaryRepositories',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns CiProductWorkflowsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciProductsWorkflowsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiProductWorkflowsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/relationships/workflows',
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
     * @param fieldsCiWorkflows the fields to include for returned resources of type ciWorkflows
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns CiWorkflowsResponse List of CiWorkflows
     * @throws ApiError
     */
    public static ciProductsWorkflowsGetToManyRelated(
        id: string,
        fieldsCiWorkflows?: Array<'name' | 'description' | 'branchStartCondition' | 'tagStartCondition' | 'pullRequestStartCondition' | 'scheduledStartCondition' | 'manualBranchStartCondition' | 'manualTagStartCondition' | 'manualPullRequestStartCondition' | 'actions' | 'isEnabled' | 'isLockedForEditing' | 'clean' | 'containerFilePath' | 'lastModifiedDate' | 'product' | 'repository' | 'xcodeVersion' | 'macOsVersion' | 'buildRuns'>,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        limit?: number,
        include?: Array<'product' | 'repository' | 'xcodeVersion' | 'macOsVersion'>,
    ): CancelablePromise<CiWorkflowsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciProducts/{id}/workflows',
            path: {
                'id': id,
            },
            query: {
                'fields[ciWorkflows]': fieldsCiWorkflows,
                'fields[ciProducts]': fieldsCiProducts,
                'fields[scmRepositories]': fieldsScmRepositories,
                'fields[ciXcodeVersions]': fieldsCiXcodeVersions,
                'fields[ciMacOsVersions]': fieldsCiMacOsVersions,
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
