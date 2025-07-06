/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessibilityDeclarationsResponse } from '../models/AccessibilityDeclarationsResponse';
import type { AlternativeDistributionKeyResponse } from '../models/AlternativeDistributionKeyResponse';
import type { AnalyticsReportRequestsResponse } from '../models/AnalyticsReportRequestsResponse';
import type { AppAccessibilityDeclarationsLinkagesResponse } from '../models/AppAccessibilityDeclarationsLinkagesResponse';
import type { AppAlternativeDistributionKeyLinkageResponse } from '../models/AppAlternativeDistributionKeyLinkageResponse';
import type { AppAnalyticsReportRequestsLinkagesResponse } from '../models/AppAnalyticsReportRequestsLinkagesResponse';
import type { AppAppAvailabilityV2LinkageResponse } from '../models/AppAppAvailabilityV2LinkageResponse';
import type { AppAppClipsLinkagesResponse } from '../models/AppAppClipsLinkagesResponse';
import type { AppAppCustomProductPagesLinkagesResponse } from '../models/AppAppCustomProductPagesLinkagesResponse';
import type { AppAppEncryptionDeclarationsLinkagesResponse } from '../models/AppAppEncryptionDeclarationsLinkagesResponse';
import type { AppAppEventsLinkagesResponse } from '../models/AppAppEventsLinkagesResponse';
import type { AppAppInfosLinkagesResponse } from '../models/AppAppInfosLinkagesResponse';
import type { AppAppPricePointsLinkagesResponse } from '../models/AppAppPricePointsLinkagesResponse';
import type { AppAppPriceScheduleLinkageResponse } from '../models/AppAppPriceScheduleLinkageResponse';
import type { AppAppStoreVersionExperimentsV2LinkagesResponse } from '../models/AppAppStoreVersionExperimentsV2LinkagesResponse';
import type { AppAppStoreVersionsLinkagesResponse } from '../models/AppAppStoreVersionsLinkagesResponse';
import type { AppAvailabilityV2Response } from '../models/AppAvailabilityV2Response';
import type { AppBackgroundAssetsLinkagesResponse } from '../models/AppBackgroundAssetsLinkagesResponse';
import type { AppBetaAppLocalizationsLinkagesResponse } from '../models/AppBetaAppLocalizationsLinkagesResponse';
import type { AppBetaAppReviewDetailLinkageResponse } from '../models/AppBetaAppReviewDetailLinkageResponse';
import type { AppBetaFeedbackCrashSubmissionsLinkagesResponse } from '../models/AppBetaFeedbackCrashSubmissionsLinkagesResponse';
import type { AppBetaFeedbackScreenshotSubmissionsLinkagesResponse } from '../models/AppBetaFeedbackScreenshotSubmissionsLinkagesResponse';
import type { AppBetaGroupsLinkagesResponse } from '../models/AppBetaGroupsLinkagesResponse';
import type { AppBetaLicenseAgreementLinkageResponse } from '../models/AppBetaLicenseAgreementLinkageResponse';
import type { AppBetaTestersLinkagesRequest } from '../models/AppBetaTestersLinkagesRequest';
import type { AppBuildsLinkagesResponse } from '../models/AppBuildsLinkagesResponse';
import type { AppCiProductLinkageResponse } from '../models/AppCiProductLinkageResponse';
import type { AppClipsResponse } from '../models/AppClipsResponse';
import type { AppCustomerReviewsLinkagesResponse } from '../models/AppCustomerReviewsLinkagesResponse';
import type { AppCustomProductPagesResponse } from '../models/AppCustomProductPagesResponse';
import type { AppEncryptionDeclarationsResponse } from '../models/AppEncryptionDeclarationsResponse';
import type { AppEndUserLicenseAgreementLinkageResponse } from '../models/AppEndUserLicenseAgreementLinkageResponse';
import type { AppEventsResponse } from '../models/AppEventsResponse';
import type { AppGameCenterDetailLinkageResponse } from '../models/AppGameCenterDetailLinkageResponse';
import type { AppGameCenterEnabledVersionsLinkagesResponse } from '../models/AppGameCenterEnabledVersionsLinkagesResponse';
import type { AppInAppPurchasesLinkagesResponse } from '../models/AppInAppPurchasesLinkagesResponse';
import type { AppInAppPurchasesV2LinkagesResponse } from '../models/AppInAppPurchasesV2LinkagesResponse';
import type { AppInfosResponse } from '../models/AppInfosResponse';
import type { AppMarketplaceSearchDetailLinkageResponse } from '../models/AppMarketplaceSearchDetailLinkageResponse';
import type { AppPreReleaseVersionsLinkagesResponse } from '../models/AppPreReleaseVersionsLinkagesResponse';
import type { AppPricePointsV3Response } from '../models/AppPricePointsV3Response';
import type { AppPriceScheduleResponse } from '../models/AppPriceScheduleResponse';
import type { AppPromotedPurchasesLinkagesRequest } from '../models/AppPromotedPurchasesLinkagesRequest';
import type { AppPromotedPurchasesLinkagesResponse } from '../models/AppPromotedPurchasesLinkagesResponse';
import type { AppResponse } from '../models/AppResponse';
import type { AppReviewSubmissionsLinkagesResponse } from '../models/AppReviewSubmissionsLinkagesResponse';
import type { AppsBetaTesterUsagesV1MetricResponse } from '../models/AppsBetaTesterUsagesV1MetricResponse';
import type { AppsResponse } from '../models/AppsResponse';
import type { AppStoreVersionExperimentsV2Response } from '../models/AppStoreVersionExperimentsV2Response';
import type { AppStoreVersionsResponse } from '../models/AppStoreVersionsResponse';
import type { AppSubscriptionGracePeriodLinkageResponse } from '../models/AppSubscriptionGracePeriodLinkageResponse';
import type { AppSubscriptionGroupsLinkagesResponse } from '../models/AppSubscriptionGroupsLinkagesResponse';
import type { AppUpdateRequest } from '../models/AppUpdateRequest';
import type { AppWebhooksLinkagesResponse } from '../models/AppWebhooksLinkagesResponse';
import type { BackgroundAssetsResponse } from '../models/BackgroundAssetsResponse';
import type { BetaAppLocalizationsWithoutIncludesResponse } from '../models/BetaAppLocalizationsWithoutIncludesResponse';
import type { BetaAppReviewDetailWithoutIncludesResponse } from '../models/BetaAppReviewDetailWithoutIncludesResponse';
import type { BetaFeedbackCrashSubmissionsResponse } from '../models/BetaFeedbackCrashSubmissionsResponse';
import type { BetaFeedbackScreenshotSubmissionsResponse } from '../models/BetaFeedbackScreenshotSubmissionsResponse';
import type { BetaGroupsWithoutIncludesResponse } from '../models/BetaGroupsWithoutIncludesResponse';
import type { BetaLicenseAgreementWithoutIncludesResponse } from '../models/BetaLicenseAgreementWithoutIncludesResponse';
import type { BuildsWithoutIncludesResponse } from '../models/BuildsWithoutIncludesResponse';
import type { CiProductResponse } from '../models/CiProductResponse';
import type { CustomerReviewsResponse } from '../models/CustomerReviewsResponse';
import type { CustomerReviewSummarizationsResponse } from '../models/CustomerReviewSummarizationsResponse';
import type { EndUserLicenseAgreementWithoutIncludesResponse } from '../models/EndUserLicenseAgreementWithoutIncludesResponse';
import type { GameCenterDetailResponse } from '../models/GameCenterDetailResponse';
import type { GameCenterEnabledVersionsResponse } from '../models/GameCenterEnabledVersionsResponse';
import type { InAppPurchasesResponse } from '../models/InAppPurchasesResponse';
import type { InAppPurchasesV2Response } from '../models/InAppPurchasesV2Response';
import type { MarketplaceSearchDetailResponse } from '../models/MarketplaceSearchDetailResponse';
import type { PreReleaseVersionsWithoutIncludesResponse } from '../models/PreReleaseVersionsWithoutIncludesResponse';
import type { PromotedPurchasesResponse } from '../models/PromotedPurchasesResponse';
import type { ReviewSubmissionsResponse } from '../models/ReviewSubmissionsResponse';
import type { SubscriptionGracePeriodResponse } from '../models/SubscriptionGracePeriodResponse';
import type { SubscriptionGroupsResponse } from '../models/SubscriptionGroupsResponse';
import type { WebhooksResponse } from '../models/WebhooksResponse';
import type { xcodeMetrics } from '../models/xcodeMetrics';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppsService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterBundleId filter by attribute 'bundleId'
     * @param filterSku filter by attribute 'sku'
     * @param filterAppStoreVersionsAppStoreState filter by attribute 'appStoreVersions.appStoreState'
     * @param filterAppStoreVersionsPlatform filter by attribute 'appStoreVersions.platform'
     * @param filterAppStoreVersionsAppVersionState filter by attribute 'appStoreVersions.appVersionState'
     * @param filterReviewSubmissionsState filter by attribute 'reviewSubmissions.state'
     * @param filterReviewSubmissionsPlatform filter by attribute 'reviewSubmissions.platform'
     * @param filterAppStoreVersions filter by id(s) of related 'appStoreVersions'
     * @param filterId filter by id(s)
     * @param existsGameCenterEnabledVersions filter by existence or non-existence of related 'gameCenterEnabledVersions'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
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
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppClips maximum number of related appClips returned (when they are included)
     * @param limitAppCustomProductPages maximum number of related appCustomProductPages returned (when they are included)
     * @param limitAppEncryptionDeclarations maximum number of related appEncryptionDeclarations returned (when they are included)
     * @param limitAppEvents maximum number of related appEvents returned (when they are included)
     * @param limitAppInfos maximum number of related appInfos returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @param limitAppStoreVersions maximum number of related appStoreVersions returned (when they are included)
     * @param limitBetaAppLocalizations maximum number of related betaAppLocalizations returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @param limitGameCenterEnabledVersions maximum number of related gameCenterEnabledVersions returned (when they are included)
     * @param limitInAppPurchases maximum number of related inAppPurchases returned (when they are included)
     * @param limitInAppPurchasesV2 maximum number of related inAppPurchasesV2 returned (when they are included)
     * @param limitPreReleaseVersions maximum number of related preReleaseVersions returned (when they are included)
     * @param limitPromotedPurchases maximum number of related promotedPurchases returned (when they are included)
     * @param limitReviewSubmissions maximum number of related reviewSubmissions returned (when they are included)
     * @param limitSubscriptionGroups maximum number of related subscriptionGroups returned (when they are included)
     * @returns AppsResponse List of Apps
     * @throws ApiError
     */
    public static appsGetCollection(
        filterName?: Array<string>,
        filterBundleId?: Array<string>,
        filterSku?: Array<string>,
        filterAppStoreVersionsAppStoreState?: Array<'ACCEPTED' | 'DEVELOPER_REMOVED_FROM_SALE' | 'DEVELOPER_REJECTED' | 'IN_REVIEW' | 'INVALID_BINARY' | 'METADATA_REJECTED' | 'PENDING_APPLE_RELEASE' | 'PENDING_CONTRACT' | 'PENDING_DEVELOPER_RELEASE' | 'PREPARE_FOR_SUBMISSION' | 'PREORDER_READY_FOR_SALE' | 'PROCESSING_FOR_APP_STORE' | 'READY_FOR_REVIEW' | 'READY_FOR_SALE' | 'REJECTED' | 'REMOVED_FROM_SALE' | 'WAITING_FOR_EXPORT_COMPLIANCE' | 'WAITING_FOR_REVIEW' | 'REPLACED_WITH_NEW_VERSION' | 'NOT_APPLICABLE'>,
        filterAppStoreVersionsPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterAppStoreVersionsAppVersionState?: Array<'ACCEPTED' | 'DEVELOPER_REJECTED' | 'IN_REVIEW' | 'INVALID_BINARY' | 'METADATA_REJECTED' | 'PENDING_APPLE_RELEASE' | 'PENDING_DEVELOPER_RELEASE' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING_FOR_DISTRIBUTION' | 'READY_FOR_DISTRIBUTION' | 'READY_FOR_REVIEW' | 'REJECTED' | 'REPLACED_WITH_NEW_VERSION' | 'WAITING_FOR_EXPORT_COMPLIANCE' | 'WAITING_FOR_REVIEW'>,
        filterReviewSubmissionsState?: Array<'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'UNRESOLVED_ISSUES' | 'CANCELING' | 'COMPLETING' | 'COMPLETE'>,
        filterReviewSubmissionsPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterAppStoreVersions?: Array<string>,
        filterId?: Array<string>,
        existsGameCenterEnabledVersions?: boolean,
        sort?: Array<'name' | '-name' | 'bundleId' | '-bundleId' | 'sku' | '-sku'>,
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
        limit?: number,
        include?: Array<'appEncryptionDeclarations' | 'ciProduct' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'endUserLicenseAgreement' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2'>,
        limitAppClips?: number,
        limitAppCustomProductPages?: number,
        limitAppEncryptionDeclarations?: number,
        limitAppEvents?: number,
        limitAppInfos?: number,
        limitAppStoreVersionExperimentsV2?: number,
        limitAppStoreVersions?: number,
        limitBetaAppLocalizations?: number,
        limitBetaGroups?: number,
        limitBuilds?: number,
        limitGameCenterEnabledVersions?: number,
        limitInAppPurchases?: number,
        limitInAppPurchasesV2?: number,
        limitPreReleaseVersions?: number,
        limitPromotedPurchases?: number,
        limitReviewSubmissions?: number,
        limitSubscriptionGroups?: number,
    ): CancelablePromise<AppsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps',
            query: {
                'filter[name]': filterName,
                'filter[bundleId]': filterBundleId,
                'filter[sku]': filterSku,
                'filter[appStoreVersions.appStoreState]': filterAppStoreVersionsAppStoreState,
                'filter[appStoreVersions.platform]': filterAppStoreVersionsPlatform,
                'filter[appStoreVersions.appVersionState]': filterAppStoreVersionsAppVersionState,
                'filter[reviewSubmissions.state]': filterReviewSubmissionsState,
                'filter[reviewSubmissions.platform]': filterReviewSubmissionsPlatform,
                'filter[appStoreVersions]': filterAppStoreVersions,
                'filter[id]': filterId,
                'exists[gameCenterEnabledVersions]': existsGameCenterEnabledVersions,
                'sort': sort,
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
                'limit': limit,
                'include': include,
                'limit[appClips]': limitAppClips,
                'limit[appCustomProductPages]': limitAppCustomProductPages,
                'limit[appEncryptionDeclarations]': limitAppEncryptionDeclarations,
                'limit[appEvents]': limitAppEvents,
                'limit[appInfos]': limitAppInfos,
                'limit[appStoreVersionExperimentsV2]': limitAppStoreVersionExperimentsV2,
                'limit[appStoreVersions]': limitAppStoreVersions,
                'limit[betaAppLocalizations]': limitBetaAppLocalizations,
                'limit[betaGroups]': limitBetaGroups,
                'limit[builds]': limitBuilds,
                'limit[gameCenterEnabledVersions]': limitGameCenterEnabledVersions,
                'limit[inAppPurchases]': limitInAppPurchases,
                'limit[inAppPurchasesV2]': limitInAppPurchasesV2,
                'limit[preReleaseVersions]': limitPreReleaseVersions,
                'limit[promotedPurchases]': limitPromotedPurchases,
                'limit[reviewSubmissions]': limitReviewSubmissions,
                'limit[subscriptionGroups]': limitSubscriptionGroups,
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
     * @param limitAppClips maximum number of related appClips returned (when they are included)
     * @param limitAppCustomProductPages maximum number of related appCustomProductPages returned (when they are included)
     * @param limitAppEncryptionDeclarations maximum number of related appEncryptionDeclarations returned (when they are included)
     * @param limitAppEvents maximum number of related appEvents returned (when they are included)
     * @param limitAppInfos maximum number of related appInfos returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @param limitAppStoreVersions maximum number of related appStoreVersions returned (when they are included)
     * @param limitBetaAppLocalizations maximum number of related betaAppLocalizations returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @param limitGameCenterEnabledVersions maximum number of related gameCenterEnabledVersions returned (when they are included)
     * @param limitInAppPurchases maximum number of related inAppPurchases returned (when they are included)
     * @param limitInAppPurchasesV2 maximum number of related inAppPurchasesV2 returned (when they are included)
     * @param limitPreReleaseVersions maximum number of related preReleaseVersions returned (when they are included)
     * @param limitPromotedPurchases maximum number of related promotedPurchases returned (when they are included)
     * @param limitReviewSubmissions maximum number of related reviewSubmissions returned (when they are included)
     * @param limitSubscriptionGroups maximum number of related subscriptionGroups returned (when they are included)
     * @returns AppResponse Single App
     * @throws ApiError
     */
    public static appsGetInstance(
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
        limitAppClips?: number,
        limitAppCustomProductPages?: number,
        limitAppEncryptionDeclarations?: number,
        limitAppEvents?: number,
        limitAppInfos?: number,
        limitAppStoreVersionExperimentsV2?: number,
        limitAppStoreVersions?: number,
        limitBetaAppLocalizations?: number,
        limitBetaGroups?: number,
        limitBuilds?: number,
        limitGameCenterEnabledVersions?: number,
        limitInAppPurchases?: number,
        limitInAppPurchasesV2?: number,
        limitPreReleaseVersions?: number,
        limitPromotedPurchases?: number,
        limitReviewSubmissions?: number,
        limitSubscriptionGroups?: number,
    ): CancelablePromise<AppResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}',
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
                'limit[appClips]': limitAppClips,
                'limit[appCustomProductPages]': limitAppCustomProductPages,
                'limit[appEncryptionDeclarations]': limitAppEncryptionDeclarations,
                'limit[appEvents]': limitAppEvents,
                'limit[appInfos]': limitAppInfos,
                'limit[appStoreVersionExperimentsV2]': limitAppStoreVersionExperimentsV2,
                'limit[appStoreVersions]': limitAppStoreVersions,
                'limit[betaAppLocalizations]': limitBetaAppLocalizations,
                'limit[betaGroups]': limitBetaGroups,
                'limit[builds]': limitBuilds,
                'limit[gameCenterEnabledVersions]': limitGameCenterEnabledVersions,
                'limit[inAppPurchases]': limitInAppPurchases,
                'limit[inAppPurchasesV2]': limitInAppPurchasesV2,
                'limit[preReleaseVersions]': limitPreReleaseVersions,
                'limit[promotedPurchases]': limitPromotedPurchases,
                'limit[reviewSubmissions]': limitReviewSubmissions,
                'limit[subscriptionGroups]': limitSubscriptionGroups,
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
     * @param requestBody App representation
     * @returns AppResponse Single App
     * @throws ApiError
     */
    public static appsUpdateInstance(
        id: string,
        requestBody: AppUpdateRequest,
    ): CancelablePromise<AppResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/apps/{id}',
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
     * @param limit maximum resources per page
     * @returns AppAccessibilityDeclarationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAccessibilityDeclarationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAccessibilityDeclarationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/accessibilityDeclarations',
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
     * @param filterDeviceFamily filter by attribute 'deviceFamily'
     * @param filterState filter by attribute 'state'
     * @param fieldsAccessibilityDeclarations the fields to include for returned resources of type accessibilityDeclarations
     * @param limit maximum resources per page
     * @returns AccessibilityDeclarationsResponse List of AccessibilityDeclarations
     * @throws ApiError
     */
    public static appsAccessibilityDeclarationsGetToManyRelated(
        id: string,
        filterDeviceFamily?: Array<'IPHONE' | 'IPAD' | 'APPLE_TV' | 'APPLE_WATCH' | 'MAC' | 'VISION'>,
        filterState?: Array<'DRAFT' | 'PUBLISHED' | 'REPLACED'>,
        fieldsAccessibilityDeclarations?: Array<'deviceFamily' | 'state' | 'supportsAudioDescriptions' | 'supportsCaptions' | 'supportsDarkInterface' | 'supportsDifferentiateWithoutColorAlone' | 'supportsLargerText' | 'supportsReducedMotion' | 'supportsSufficientContrast' | 'supportsVoiceControl' | 'supportsVoiceover'>,
        limit?: number,
    ): CancelablePromise<AccessibilityDeclarationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/accessibilityDeclarations',
            path: {
                'id': id,
            },
            query: {
                'filter[deviceFamily]': filterDeviceFamily,
                'filter[state]': filterState,
                'fields[accessibilityDeclarations]': fieldsAccessibilityDeclarations,
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
     * @returns AppAlternativeDistributionKeyLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsAlternativeDistributionKeyGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppAlternativeDistributionKeyLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/alternativeDistributionKey',
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
     * @param fieldsAlternativeDistributionKeys the fields to include for returned resources of type alternativeDistributionKeys
     * @returns AlternativeDistributionKeyResponse Single AlternativeDistributionKey
     * @throws ApiError
     */
    public static appsAlternativeDistributionKeyGetToOneRelated(
        id: string,
        fieldsAlternativeDistributionKeys?: Array<'publicKey'>,
    ): CancelablePromise<AlternativeDistributionKeyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/alternativeDistributionKey',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionKeys]': fieldsAlternativeDistributionKeys,
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
     * @returns AppAnalyticsReportRequestsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAnalyticsReportRequestsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAnalyticsReportRequestsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/analyticsReportRequests',
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
     * @param filterAccessType filter by attribute 'accessType'
     * @param fieldsAnalyticsReportRequests the fields to include for returned resources of type analyticsReportRequests
     * @param fieldsAnalyticsReports the fields to include for returned resources of type analyticsReports
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitReports maximum number of related reports returned (when they are included)
     * @returns AnalyticsReportRequestsResponse List of AnalyticsReportRequests
     * @throws ApiError
     */
    public static appsAnalyticsReportRequestsGetToManyRelated(
        id: string,
        filterAccessType?: Array<'ONE_TIME_SNAPSHOT' | 'ONGOING'>,
        fieldsAnalyticsReportRequests?: Array<'accessType' | 'stoppedDueToInactivity' | 'reports'>,
        fieldsAnalyticsReports?: Array<'name' | 'category' | 'instances'>,
        limit?: number,
        include?: Array<'reports'>,
        limitReports?: number,
    ): CancelablePromise<AnalyticsReportRequestsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/analyticsReportRequests',
            path: {
                'id': id,
            },
            query: {
                'filter[accessType]': filterAccessType,
                'fields[analyticsReportRequests]': fieldsAnalyticsReportRequests,
                'fields[analyticsReports]': fieldsAnalyticsReports,
                'limit': limit,
                'include': include,
                'limit[reports]': limitReports,
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
     * @returns AppAppAvailabilityV2LinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsAppAvailabilityV2GetToOneRelationship(
        id: string,
    ): CancelablePromise<AppAppAvailabilityV2LinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appAvailabilityV2',
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
     * @param fieldsAppAvailabilities the fields to include for returned resources of type appAvailabilities
     * @param fieldsTerritoryAvailabilities the fields to include for returned resources of type territoryAvailabilities
     * @param include comma-separated list of relationships to include
     * @param limitTerritoryAvailabilities maximum number of related territoryAvailabilities returned (when they are included)
     * @returns AppAvailabilityV2Response Single AppAvailability
     * @throws ApiError
     */
    public static appsAppAvailabilityV2GetToOneRelated(
        id: string,
        fieldsAppAvailabilities?: Array<'availableInNewTerritories' | 'territoryAvailabilities'>,
        fieldsTerritoryAvailabilities?: Array<'available' | 'releaseDate' | 'preOrderEnabled' | 'preOrderPublishDate' | 'contentStatuses' | 'territory'>,
        include?: Array<'territoryAvailabilities'>,
        limitTerritoryAvailabilities?: number,
    ): CancelablePromise<AppAvailabilityV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appAvailabilityV2',
            path: {
                'id': id,
            },
            query: {
                'fields[appAvailabilities]': fieldsAppAvailabilities,
                'fields[territoryAvailabilities]': fieldsTerritoryAvailabilities,
                'include': include,
                'limit[territoryAvailabilities]': limitTerritoryAvailabilities,
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
     * @returns AppAppClipsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppClipsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppClipsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appClips',
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
     * @param filterBundleId filter by attribute 'bundleId'
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppClipDefaultExperiences maximum number of related appClipDefaultExperiences returned (when they are included)
     * @returns AppClipsResponse List of AppClips
     * @throws ApiError
     */
    public static appsAppClipsGetToManyRelated(
        id: string,
        filterBundleId?: Array<string>,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        limit?: number,
        include?: Array<'app' | 'appClipDefaultExperiences'>,
        limitAppClipDefaultExperiences?: number,
    ): CancelablePromise<AppClipsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appClips',
            path: {
                'id': id,
            },
            query: {
                'filter[bundleId]': filterBundleId,
                'fields[appClips]': fieldsAppClips,
                'fields[apps]': fieldsApps,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'limit': limit,
                'include': include,
                'limit[appClipDefaultExperiences]': limitAppClipDefaultExperiences,
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
     * @returns AppAppCustomProductPagesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppCustomProductPagesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppCustomProductPagesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appCustomProductPages',
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
     * @param filterVisible filter by attribute 'visible'
     * @param fieldsAppCustomProductPages the fields to include for returned resources of type appCustomProductPages
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppCustomProductPageVersions maximum number of related appCustomProductPageVersions returned (when they are included)
     * @returns AppCustomProductPagesResponse List of AppCustomProductPages
     * @throws ApiError
     */
    public static appsAppCustomProductPagesGetToManyRelated(
        id: string,
        filterVisible?: Array<string>,
        fieldsAppCustomProductPages?: Array<'name' | 'url' | 'visible' | 'app' | 'appCustomProductPageVersions'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        limit?: number,
        include?: Array<'app' | 'appCustomProductPageVersions'>,
        limitAppCustomProductPageVersions?: number,
    ): CancelablePromise<AppCustomProductPagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appCustomProductPages',
            path: {
                'id': id,
            },
            query: {
                'filter[visible]': filterVisible,
                'fields[appCustomProductPages]': fieldsAppCustomProductPages,
                'fields[apps]': fieldsApps,
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'limit': limit,
                'include': include,
                'limit[appCustomProductPageVersions]': limitAppCustomProductPageVersions,
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
     * @returns AppAppEncryptionDeclarationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppEncryptionDeclarationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppEncryptionDeclarationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appEncryptionDeclarations',
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsAppEncryptionDeclarationDocuments the fields to include for returned resources of type appEncryptionDeclarationDocuments
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns AppEncryptionDeclarationsResponse List of AppEncryptionDeclarations
     * @throws ApiError
     */
    public static appsAppEncryptionDeclarationsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterBuilds?: Array<string>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsAppEncryptionDeclarationDocuments?: Array<'fileSize' | 'fileName' | 'assetToken' | 'downloadUrl' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState'>,
        limit?: number,
        include?: Array<'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        limitBuilds?: number,
    ): CancelablePromise<AppEncryptionDeclarationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appEncryptionDeclarations',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[builds]': filterBuilds,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[apps]': fieldsApps,
                'fields[builds]': fieldsBuilds,
                'fields[appEncryptionDeclarationDocuments]': fieldsAppEncryptionDeclarationDocuments,
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
     * @returns AppAppEventsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppEventsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppEventsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appEvents',
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
     * @param filterEventState filter by attribute 'eventState'
     * @param filterId filter by id(s)
     * @param fieldsAppEvents the fields to include for returned resources of type appEvents
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @returns AppEventsResponse List of AppEvents
     * @throws ApiError
     */
    public static appsAppEventsGetToManyRelated(
        id: string,
        filterEventState?: Array<'DRAFT' | 'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'REJECTED' | 'ACCEPTED' | 'APPROVED' | 'PUBLISHED' | 'PAST' | 'ARCHIVED'>,
        filterId?: Array<string>,
        fieldsAppEvents?: Array<'referenceName' | 'badge' | 'eventState' | 'deepLink' | 'purchaseRequirement' | 'primaryLocale' | 'priority' | 'purpose' | 'territorySchedules' | 'archivedTerritorySchedules' | 'localizations'>,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        limit?: number,
        include?: Array<'localizations'>,
        limitLocalizations?: number,
    ): CancelablePromise<AppEventsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appEvents',
            path: {
                'id': id,
            },
            query: {
                'filter[eventState]': filterEventState,
                'filter[id]': filterId,
                'fields[appEvents]': fieldsAppEvents,
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'limit': limit,
                'include': include,
                'limit[localizations]': limitLocalizations,
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
     * @returns AppAppInfosLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppInfosGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppInfosLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appInfos',
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
     * @param fieldsAppInfos the fields to include for returned resources of type appInfos
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAgeRatingDeclarations the fields to include for returned resources of type ageRatingDeclarations
     * @param fieldsAppInfoLocalizations the fields to include for returned resources of type appInfoLocalizations
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppInfoLocalizations maximum number of related appInfoLocalizations returned (when they are included)
     * @returns AppInfosResponse List of AppInfos
     * @throws ApiError
     */
    public static appsAppInfosGetToManyRelated(
        id: string,
        fieldsAppInfos?: Array<'appStoreState' | 'state' | 'appStoreAgeRating' | 'australiaAgeRating' | 'brazilAgeRating' | 'brazilAgeRatingV2' | 'franceAgeRating' | 'koreaAgeRating' | 'kidsAgeBand' | 'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAgeRatingDeclarations?: Array<'alcoholTobaccoOrDrugUseOrReferences' | 'contests' | 'gambling' | 'gamblingSimulated' | 'kidsAgeBand' | 'lootBox' | 'medicalOrTreatmentInformation' | 'profanityOrCrudeHumor' | 'sexualContentGraphicAndNudity' | 'sexualContentOrNudity' | 'horrorOrFearThemes' | 'matureOrSuggestiveThemes' | 'unrestrictedWebAccess' | 'violenceCartoonOrFantasy' | 'violenceRealisticProlongedGraphicOrSadistic' | 'violenceRealistic' | 'koreaAgeRatingOverride'>,
        fieldsAppInfoLocalizations?: Array<'locale' | 'name' | 'subtitle' | 'privacyPolicyUrl' | 'privacyChoicesUrl' | 'privacyPolicyText' | 'appInfo'>,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        limit?: number,
        include?: Array<'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        limitAppInfoLocalizations?: number,
    ): CancelablePromise<AppInfosResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appInfos',
            path: {
                'id': id,
            },
            query: {
                'fields[appInfos]': fieldsAppInfos,
                'fields[apps]': fieldsApps,
                'fields[ageRatingDeclarations]': fieldsAgeRatingDeclarations,
                'fields[appInfoLocalizations]': fieldsAppInfoLocalizations,
                'fields[appCategories]': fieldsAppCategories,
                'limit': limit,
                'include': include,
                'limit[appInfoLocalizations]': limitAppInfoLocalizations,
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
     * @returns AppAppPricePointsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppPricePointsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppPricePointsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appPricePoints',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsAppPricePoints the fields to include for returned resources of type appPricePoints
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppPricePointsV3Response List of AppPricePoints
     * @throws ApiError
     */
    public static appsAppPricePointsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsAppPricePoints?: Array<'customerPrice' | 'proceeds' | 'app' | 'equalizations' | 'territory'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'app' | 'territory'>,
    ): CancelablePromise<AppPricePointsV3Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appPricePoints',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[appPricePoints]': fieldsAppPricePoints,
                'fields[apps]': fieldsApps,
                'fields[territories]': fieldsTerritories,
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
     * @returns AppAppPriceScheduleLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsAppPriceScheduleGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppAppPriceScheduleLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appPriceSchedule',
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
     * @param fieldsAppPriceSchedules the fields to include for returned resources of type appPriceSchedules
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsAppPrices the fields to include for returned resources of type appPrices
     * @param include comma-separated list of relationships to include
     * @param limitManualPrices maximum number of related manualPrices returned (when they are included)
     * @param limitAutomaticPrices maximum number of related automaticPrices returned (when they are included)
     * @returns AppPriceScheduleResponse Single AppPriceSchedule
     * @throws ApiError
     */
    public static appsAppPriceScheduleGetToOneRelated(
        id: string,
        fieldsAppPriceSchedules?: Array<'app' | 'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsAppPrices?: Array<'manual' | 'startDate' | 'endDate' | 'appPricePoint' | 'territory'>,
        include?: Array<'app' | 'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        limitManualPrices?: number,
        limitAutomaticPrices?: number,
    ): CancelablePromise<AppPriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appPriceSchedule',
            path: {
                'id': id,
            },
            query: {
                'fields[appPriceSchedules]': fieldsAppPriceSchedules,
                'fields[apps]': fieldsApps,
                'fields[territories]': fieldsTerritories,
                'fields[appPrices]': fieldsAppPrices,
                'include': include,
                'limit[manualPrices]': limitManualPrices,
                'limit[automaticPrices]': limitAutomaticPrices,
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
     * @returns AppAppStoreVersionExperimentsV2LinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppStoreVersionExperimentsV2GetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppStoreVersionExperimentsV2LinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appStoreVersionExperimentsV2',
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
     * @param filterState filter by attribute 'state'
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitControlVersions maximum number of related controlVersions returned (when they are included)
     * @param limitAppStoreVersionExperimentTreatments maximum number of related appStoreVersionExperimentTreatments returned (when they are included)
     * @returns AppStoreVersionExperimentsV2Response List of AppStoreVersionExperiments
     * @throws ApiError
     */
    public static appsAppStoreVersionExperimentsV2GetToManyRelated(
        id: string,
        filterState?: Array<'PREPARE_FOR_SUBMISSION' | 'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'ACCEPTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'STOPPED'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'platform' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'app' | 'latestControlVersion' | 'controlVersions' | 'appStoreVersionExperimentTreatments'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        limit?: number,
        include?: Array<'app' | 'latestControlVersion' | 'controlVersions' | 'appStoreVersionExperimentTreatments'>,
        limitControlVersions?: number,
        limitAppStoreVersionExperimentTreatments?: number,
    ): CancelablePromise<AppStoreVersionExperimentsV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appStoreVersionExperimentsV2',
            path: {
                'id': id,
            },
            query: {
                'filter[state]': filterState,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[apps]': fieldsApps,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'limit': limit,
                'include': include,
                'limit[controlVersions]': limitControlVersions,
                'limit[appStoreVersionExperimentTreatments]': limitAppStoreVersionExperimentTreatments,
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
     * @returns AppAppStoreVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsAppStoreVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAppStoreVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/appStoreVersions',
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterVersionString filter by attribute 'versionString'
     * @param filterAppStoreState filter by attribute 'appStoreState'
     * @param filterAppVersionState filter by attribute 'appVersionState'
     * @param filterId filter by id(s)
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
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionLocalizations maximum number of related appStoreVersionLocalizations returned (when they are included)
     * @param limitAppStoreVersionExperiments maximum number of related appStoreVersionExperiments returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @returns AppStoreVersionsResponse List of AppStoreVersions
     * @throws ApiError
     */
    public static appsAppStoreVersionsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterVersionString?: Array<string>,
        filterAppStoreState?: Array<'ACCEPTED' | 'DEVELOPER_REMOVED_FROM_SALE' | 'DEVELOPER_REJECTED' | 'IN_REVIEW' | 'INVALID_BINARY' | 'METADATA_REJECTED' | 'PENDING_APPLE_RELEASE' | 'PENDING_CONTRACT' | 'PENDING_DEVELOPER_RELEASE' | 'PREPARE_FOR_SUBMISSION' | 'PREORDER_READY_FOR_SALE' | 'PROCESSING_FOR_APP_STORE' | 'READY_FOR_REVIEW' | 'READY_FOR_SALE' | 'REJECTED' | 'REMOVED_FROM_SALE' | 'WAITING_FOR_EXPORT_COMPLIANCE' | 'WAITING_FOR_REVIEW' | 'REPLACED_WITH_NEW_VERSION' | 'NOT_APPLICABLE'>,
        filterAppVersionState?: Array<'ACCEPTED' | 'DEVELOPER_REJECTED' | 'IN_REVIEW' | 'INVALID_BINARY' | 'METADATA_REJECTED' | 'PENDING_APPLE_RELEASE' | 'PENDING_DEVELOPER_RELEASE' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING_FOR_DISTRIBUTION' | 'READY_FOR_DISTRIBUTION' | 'READY_FOR_REVIEW' | 'REJECTED' | 'REPLACED_WITH_NEW_VERSION' | 'WAITING_FOR_EXPORT_COMPLIANCE' | 'WAITING_FOR_REVIEW'>,
        filterId?: Array<string>,
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
        limit?: number,
        include?: Array<'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionPackage'>,
        limitAppStoreVersionLocalizations?: number,
        limitAppStoreVersionExperiments?: number,
        limitAppStoreVersionExperimentsV2?: number,
    ): CancelablePromise<AppStoreVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/appStoreVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[versionString]': filterVersionString,
                'filter[appStoreState]': filterAppStoreState,
                'filter[appVersionState]': filterAppVersionState,
                'filter[id]': filterId,
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
                'limit': limit,
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
     * @param limit maximum resources per page
     * @returns AppBackgroundAssetsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBackgroundAssetsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBackgroundAssetsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/backgroundAssets',
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
     * @param filterAssetPackIdentifier filter by attribute 'assetPackIdentifier'
     * @param fieldsBackgroundAssets the fields to include for returned resources of type backgroundAssets
     * @param fieldsBackgroundAssetVersions the fields to include for returned resources of type backgroundAssetVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BackgroundAssetsResponse List of BackgroundAssets
     * @throws ApiError
     */
    public static appsBackgroundAssetsGetToManyRelated(
        id: string,
        filterAssetPackIdentifier?: Array<string>,
        fieldsBackgroundAssets?: Array<'assetPackIdentifier' | 'createdDate' | 'versions' | 'internalBetaVersion'>,
        fieldsBackgroundAssetVersions?: Array<'createdDate' | 'platforms' | 'state' | 'version' | 'internalBetaRelease' | 'assetFile' | 'manifestFile' | 'backgroundAssetUploadFiles'>,
        limit?: number,
        include?: Array<'internalBetaVersion'>,
    ): CancelablePromise<BackgroundAssetsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/backgroundAssets',
            path: {
                'id': id,
            },
            query: {
                'filter[assetPackIdentifier]': filterAssetPackIdentifier,
                'fields[backgroundAssets]': fieldsBackgroundAssets,
                'fields[backgroundAssetVersions]': fieldsBackgroundAssetVersions,
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
     * @returns AppBetaAppLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBetaAppLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBetaAppLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaAppLocalizations',
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
     * @param fieldsBetaAppLocalizations the fields to include for returned resources of type betaAppLocalizations
     * @param limit maximum resources per page
     * @returns BetaAppLocalizationsWithoutIncludesResponse List of BetaAppLocalizations with get
     * @throws ApiError
     */
    public static appsBetaAppLocalizationsGetToManyRelated(
        id: string,
        fieldsBetaAppLocalizations?: Array<'feedbackEmail' | 'marketingUrl' | 'privacyPolicyUrl' | 'tvOsPrivacyPolicy' | 'description' | 'locale' | 'app'>,
        limit?: number,
    ): CancelablePromise<BetaAppLocalizationsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaAppLocalizations',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppLocalizations]': fieldsBetaAppLocalizations,
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
     * @returns AppBetaAppReviewDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsBetaAppReviewDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppBetaAppReviewDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaAppReviewDetail',
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
     * @param fieldsBetaAppReviewDetails the fields to include for returned resources of type betaAppReviewDetails
     * @returns BetaAppReviewDetailWithoutIncludesResponse Single BetaAppReviewDetail with get
     * @throws ApiError
     */
    public static appsBetaAppReviewDetailGetToOneRelated(
        id: string,
        fieldsBetaAppReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'app'>,
    ): CancelablePromise<BetaAppReviewDetailWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaAppReviewDetail',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppReviewDetails]': fieldsBetaAppReviewDetails,
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
     * @returns AppBetaFeedbackCrashSubmissionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBetaFeedbackCrashSubmissionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBetaFeedbackCrashSubmissionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaFeedbackCrashSubmissions',
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
     * @param filterDeviceModel filter by attribute 'deviceModel'
     * @param filterOsVersion filter by attribute 'osVersion'
     * @param filterAppPlatform filter by attribute 'appPlatform'
     * @param filterDevicePlatform filter by attribute 'devicePlatform'
     * @param filterBuild filter by id(s) of related 'build'
     * @param filterBuildPreReleaseVersion filter by id(s) of related 'build.preReleaseVersion'
     * @param filterTester filter by id(s) of related 'tester'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBetaFeedbackCrashSubmissions the fields to include for returned resources of type betaFeedbackCrashSubmissions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaFeedbackCrashSubmissionsResponse List of BetaFeedbackCrashSubmissions
     * @throws ApiError
     */
    public static appsBetaFeedbackCrashSubmissionsGetToManyRelated(
        id: string,
        filterDeviceModel?: Array<string>,
        filterOsVersion?: Array<string>,
        filterAppPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterDevicePlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterBuild?: Array<string>,
        filterBuildPreReleaseVersion?: Array<string>,
        filterTester?: Array<string>,
        sort?: Array<'createdDate' | '-createdDate'>,
        fieldsBetaFeedbackCrashSubmissions?: Array<'createdDate' | 'comment' | 'email' | 'deviceModel' | 'osVersion' | 'locale' | 'timeZone' | 'architecture' | 'connectionType' | 'pairedAppleWatch' | 'appUptimeInMilliseconds' | 'diskBytesAvailable' | 'diskBytesTotal' | 'batteryPercentage' | 'screenWidthInPoints' | 'screenHeightInPoints' | 'appPlatform' | 'devicePlatform' | 'deviceFamily' | 'buildBundleId' | 'crashLog' | 'build' | 'tester'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        limit?: number,
        include?: Array<'build' | 'tester'>,
    ): CancelablePromise<BetaFeedbackCrashSubmissionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaFeedbackCrashSubmissions',
            path: {
                'id': id,
            },
            query: {
                'filter[deviceModel]': filterDeviceModel,
                'filter[osVersion]': filterOsVersion,
                'filter[appPlatform]': filterAppPlatform,
                'filter[devicePlatform]': filterDevicePlatform,
                'filter[build]': filterBuild,
                'filter[build.preReleaseVersion]': filterBuildPreReleaseVersion,
                'filter[tester]': filterTester,
                'sort': sort,
                'fields[betaFeedbackCrashSubmissions]': fieldsBetaFeedbackCrashSubmissions,
                'fields[builds]': fieldsBuilds,
                'fields[betaTesters]': fieldsBetaTesters,
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
     * @returns AppBetaFeedbackScreenshotSubmissionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBetaFeedbackScreenshotSubmissionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBetaFeedbackScreenshotSubmissionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaFeedbackScreenshotSubmissions',
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
     * @param filterDeviceModel filter by attribute 'deviceModel'
     * @param filterOsVersion filter by attribute 'osVersion'
     * @param filterAppPlatform filter by attribute 'appPlatform'
     * @param filterDevicePlatform filter by attribute 'devicePlatform'
     * @param filterBuild filter by id(s) of related 'build'
     * @param filterBuildPreReleaseVersion filter by id(s) of related 'build.preReleaseVersion'
     * @param filterTester filter by id(s) of related 'tester'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBetaFeedbackScreenshotSubmissions the fields to include for returned resources of type betaFeedbackScreenshotSubmissions
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaFeedbackScreenshotSubmissionsResponse List of BetaFeedbackScreenshotSubmissions
     * @throws ApiError
     */
    public static appsBetaFeedbackScreenshotSubmissionsGetToManyRelated(
        id: string,
        filterDeviceModel?: Array<string>,
        filterOsVersion?: Array<string>,
        filterAppPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterDevicePlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterBuild?: Array<string>,
        filterBuildPreReleaseVersion?: Array<string>,
        filterTester?: Array<string>,
        sort?: Array<'createdDate' | '-createdDate'>,
        fieldsBetaFeedbackScreenshotSubmissions?: Array<'createdDate' | 'comment' | 'email' | 'deviceModel' | 'osVersion' | 'locale' | 'timeZone' | 'architecture' | 'connectionType' | 'pairedAppleWatch' | 'appUptimeInMilliseconds' | 'diskBytesAvailable' | 'diskBytesTotal' | 'batteryPercentage' | 'screenWidthInPoints' | 'screenHeightInPoints' | 'appPlatform' | 'devicePlatform' | 'deviceFamily' | 'buildBundleId' | 'screenshots' | 'build' | 'tester'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        limit?: number,
        include?: Array<'build' | 'tester'>,
    ): CancelablePromise<BetaFeedbackScreenshotSubmissionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaFeedbackScreenshotSubmissions',
            path: {
                'id': id,
            },
            query: {
                'filter[deviceModel]': filterDeviceModel,
                'filter[osVersion]': filterOsVersion,
                'filter[appPlatform]': filterAppPlatform,
                'filter[devicePlatform]': filterDevicePlatform,
                'filter[build]': filterBuild,
                'filter[build.preReleaseVersion]': filterBuildPreReleaseVersion,
                'filter[tester]': filterTester,
                'sort': sort,
                'fields[betaFeedbackScreenshotSubmissions]': fieldsBetaFeedbackScreenshotSubmissions,
                'fields[builds]': fieldsBuilds,
                'fields[betaTesters]': fieldsBetaTesters,
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
     * @returns AppBetaGroupsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBetaGroupsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBetaGroupsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaGroups',
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
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param limit maximum resources per page
     * @returns BetaGroupsWithoutIncludesResponse List of BetaGroups with get
     * @throws ApiError
     */
    public static appsBetaGroupsGetToManyRelated(
        id: string,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        limit?: number,
    ): CancelablePromise<BetaGroupsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaGroups',
            path: {
                'id': id,
            },
            query: {
                'fields[betaGroups]': fieldsBetaGroups,
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
     * @returns AppBetaLicenseAgreementLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsBetaLicenseAgreementGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppBetaLicenseAgreementLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/betaLicenseAgreement',
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
     * @param fieldsBetaLicenseAgreements the fields to include for returned resources of type betaLicenseAgreements
     * @returns BetaLicenseAgreementWithoutIncludesResponse Single BetaLicenseAgreement with get
     * @throws ApiError
     */
    public static appsBetaLicenseAgreementGetToOneRelated(
        id: string,
        fieldsBetaLicenseAgreements?: Array<'agreementText' | 'app'>,
    ): CancelablePromise<BetaLicenseAgreementWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/betaLicenseAgreement',
            path: {
                'id': id,
            },
            query: {
                'fields[betaLicenseAgreements]': fieldsBetaLicenseAgreements,
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
     * @returns any Accepted for future completion
     * @throws ApiError
     */
    public static appsBetaTestersDeleteToManyRelationship(
        id: string,
        requestBody: AppBetaTestersLinkagesRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/apps/{id}/relationships/betaTesters',
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
     * @param limit maximum resources per page
     * @returns AppBuildsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsBuildsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppBuildsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/builds',
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
    public static appsBuildsGetToManyRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
    ): CancelablePromise<BuildsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/builds',
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
    /**
     * @param id the id of the requested resource
     * @returns AppCiProductLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsCiProductGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppCiProductLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/ciProduct',
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
     * @param fieldsCiProducts the fields to include for returned resources of type ciProducts
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @param fieldsScmRepositories the fields to include for returned resources of type scmRepositories
     * @param include comma-separated list of relationships to include
     * @param limitPrimaryRepositories maximum number of related primaryRepositories returned (when they are included)
     * @returns CiProductResponse Single CiProduct
     * @throws ApiError
     */
    public static appsCiProductGetToOneRelated(
        id: string,
        fieldsCiProducts?: Array<'name' | 'createdDate' | 'productType' | 'app' | 'bundleId' | 'workflows' | 'primaryRepositories' | 'additionalRepositories' | 'buildRuns'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
        fieldsScmRepositories?: Array<'lastAccessedDate' | 'httpCloneUrl' | 'sshCloneUrl' | 'ownerName' | 'repositoryName' | 'scmProvider' | 'defaultBranch' | 'gitReferences' | 'pullRequests'>,
        include?: Array<'app' | 'bundleId' | 'primaryRepositories'>,
        limitPrimaryRepositories?: number,
    ): CancelablePromise<CiProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/ciProduct',
            path: {
                'id': id,
            },
            query: {
                'fields[ciProducts]': fieldsCiProducts,
                'fields[apps]': fieldsApps,
                'fields[bundleIds]': fieldsBundleIds,
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsCustomerReviewSummarizations the fields to include for returned resources of type customerReviewSummarizations
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns CustomerReviewSummarizationsResponse List of CustomerReviewSummarizations
     * @throws ApiError
     */
    public static appsCustomerReviewSummarizationsGetToManyRelated(
        id: string,
        filterPlatform: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterTerritory?: Array<string>,
        fieldsCustomerReviewSummarizations?: Array<'createdDate' | 'locale' | 'platform' | 'text' | 'territory'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<CustomerReviewSummarizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/customerReviewSummarizations',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[territory]': filterTerritory,
                'fields[customerReviewSummarizations]': fieldsCustomerReviewSummarizations,
                'fields[territories]': fieldsTerritories,
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
     * @returns AppCustomerReviewsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsCustomerReviewsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppCustomerReviewsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/customerReviews',
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
     * @param filterTerritory filter by attribute 'territory'
     * @param filterRating filter by attribute 'rating'
     * @param existsPublishedResponse filter by publishedResponse
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsCustomerReviews the fields to include for returned resources of type customerReviews
     * @param fieldsCustomerReviewResponses the fields to include for returned resources of type customerReviewResponses
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns CustomerReviewsResponse List of CustomerReviews
     * @throws ApiError
     */
    public static appsCustomerReviewsGetToManyRelated(
        id: string,
        filterTerritory?: Array<'ABW' | 'AFG' | 'AGO' | 'AIA' | 'ALB' | 'AND' | 'ANT' | 'ARE' | 'ARG' | 'ARM' | 'ASM' | 'ATG' | 'AUS' | 'AUT' | 'AZE' | 'BDI' | 'BEL' | 'BEN' | 'BES' | 'BFA' | 'BGD' | 'BGR' | 'BHR' | 'BHS' | 'BIH' | 'BLR' | 'BLZ' | 'BMU' | 'BOL' | 'BRA' | 'BRB' | 'BRN' | 'BTN' | 'BWA' | 'CAF' | 'CAN' | 'CHE' | 'CHL' | 'CHN' | 'CIV' | 'CMR' | 'COD' | 'COG' | 'COK' | 'COL' | 'COM' | 'CPV' | 'CRI' | 'CUB' | 'CUW' | 'CXR' | 'CYM' | 'CYP' | 'CZE' | 'DEU' | 'DJI' | 'DMA' | 'DNK' | 'DOM' | 'DZA' | 'ECU' | 'EGY' | 'ERI' | 'ESP' | 'EST' | 'ETH' | 'FIN' | 'FJI' | 'FLK' | 'FRA' | 'FRO' | 'FSM' | 'GAB' | 'GBR' | 'GEO' | 'GGY' | 'GHA' | 'GIB' | 'GIN' | 'GLP' | 'GMB' | 'GNB' | 'GNQ' | 'GRC' | 'GRD' | 'GRL' | 'GTM' | 'GUF' | 'GUM' | 'GUY' | 'HKG' | 'HND' | 'HRV' | 'HTI' | 'HUN' | 'IDN' | 'IMN' | 'IND' | 'IRL' | 'IRQ' | 'ISL' | 'ISR' | 'ITA' | 'JAM' | 'JEY' | 'JOR' | 'JPN' | 'KAZ' | 'KEN' | 'KGZ' | 'KHM' | 'KIR' | 'KNA' | 'KOR' | 'KWT' | 'LAO' | 'LBN' | 'LBR' | 'LBY' | 'LCA' | 'LIE' | 'LKA' | 'LSO' | 'LTU' | 'LUX' | 'LVA' | 'MAC' | 'MAR' | 'MCO' | 'MDA' | 'MDG' | 'MDV' | 'MEX' | 'MHL' | 'MKD' | 'MLI' | 'MLT' | 'MMR' | 'MNE' | 'MNG' | 'MNP' | 'MOZ' | 'MRT' | 'MSR' | 'MTQ' | 'MUS' | 'MWI' | 'MYS' | 'MYT' | 'NAM' | 'NCL' | 'NER' | 'NFK' | 'NGA' | 'NIC' | 'NIU' | 'NLD' | 'NOR' | 'NPL' | 'NRU' | 'NZL' | 'OMN' | 'PAK' | 'PAN' | 'PER' | 'PHL' | 'PLW' | 'PNG' | 'POL' | 'PRI' | 'PRT' | 'PRY' | 'PSE' | 'PYF' | 'QAT' | 'REU' | 'ROU' | 'RUS' | 'RWA' | 'SAU' | 'SEN' | 'SGP' | 'SHN' | 'SLB' | 'SLE' | 'SLV' | 'SMR' | 'SOM' | 'SPM' | 'SRB' | 'SSD' | 'STP' | 'SUR' | 'SVK' | 'SVN' | 'SWE' | 'SWZ' | 'SXM' | 'SYC' | 'TCA' | 'TCD' | 'TGO' | 'THA' | 'TJK' | 'TKM' | 'TLS' | 'TON' | 'TTO' | 'TUN' | 'TUR' | 'TUV' | 'TWN' | 'TZA' | 'UGA' | 'UKR' | 'UMI' | 'URY' | 'USA' | 'UZB' | 'VAT' | 'VCT' | 'VEN' | 'VGB' | 'VIR' | 'VNM' | 'VUT' | 'WLF' | 'WSM' | 'YEM' | 'ZAF' | 'ZMB' | 'ZWE'>,
        filterRating?: Array<string>,
        existsPublishedResponse?: boolean,
        sort?: Array<'rating' | '-rating' | 'createdDate' | '-createdDate'>,
        fieldsCustomerReviews?: Array<'rating' | 'title' | 'body' | 'reviewerNickname' | 'createdDate' | 'territory' | 'response'>,
        fieldsCustomerReviewResponses?: Array<'responseBody' | 'lastModifiedDate' | 'state' | 'review'>,
        limit?: number,
        include?: Array<'response'>,
    ): CancelablePromise<CustomerReviewsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/customerReviews',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'filter[rating]': filterRating,
                'exists[publishedResponse]': existsPublishedResponse,
                'sort': sort,
                'fields[customerReviews]': fieldsCustomerReviews,
                'fields[customerReviewResponses]': fieldsCustomerReviewResponses,
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
     * @returns AppEndUserLicenseAgreementLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsEndUserLicenseAgreementGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppEndUserLicenseAgreementLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/endUserLicenseAgreement',
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
     * @param fieldsEndUserLicenseAgreements the fields to include for returned resources of type endUserLicenseAgreements
     * @returns EndUserLicenseAgreementWithoutIncludesResponse Single EndUserLicenseAgreement with get
     * @throws ApiError
     */
    public static appsEndUserLicenseAgreementGetToOneRelated(
        id: string,
        fieldsEndUserLicenseAgreements?: Array<'agreementText' | 'app' | 'territories'>,
    ): CancelablePromise<EndUserLicenseAgreementWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/endUserLicenseAgreement',
            path: {
                'id': id,
            },
            query: {
                'fields[endUserLicenseAgreements]': fieldsEndUserLicenseAgreements,
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
     * @returns AppGameCenterDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsGameCenterDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppGameCenterDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/gameCenterDetail',
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
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterActivityVersionReleases the fields to include for returned resources of type gameCenterActivityVersionReleases
     * @param fieldsGameCenterChallengeVersionReleases the fields to include for returned resources of type gameCenterChallengeVersionReleases
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterAppVersions maximum number of related gameCenterAppVersions returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @param limitAchievementReleases maximum number of related achievementReleases returned (when they are included)
     * @param limitActivityReleases maximum number of related activityReleases returned (when they are included)
     * @param limitChallengeReleases maximum number of related challengeReleases returned (when they are included)
     * @param limitLeaderboardReleases maximum number of related leaderboardReleases returned (when they are included)
     * @param limitLeaderboardSetReleases maximum number of related leaderboardSetReleases returned (when they are included)
     * @param limitChallengesMinimumPlatformVersions maximum number of related challengesMinimumPlatformVersions returned (when they are included)
     * @returns GameCenterDetailResponse Single GameCenterDetail
     * @throws ApiError
     */
    public static appsGameCenterDetailGetToOneRelated(
        id: string,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterActivityVersionReleases?: Array<'version'>,
        fieldsGameCenterChallengeVersionReleases?: Array<'version'>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        include?: Array<'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        limitGameCenterAppVersions?: number,
        limitGameCenterLeaderboards?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterChallenges?: number,
        limitAchievementReleases?: number,
        limitActivityReleases?: number,
        limitChallengeReleases?: number,
        limitLeaderboardReleases?: number,
        limitLeaderboardSetReleases?: number,
        limitChallengesMinimumPlatformVersions?: number,
    ): CancelablePromise<GameCenterDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/gameCenterDetail',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[apps]': fieldsApps,
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
                'fields[gameCenterActivityVersionReleases]': fieldsGameCenterActivityVersionReleases,
                'fields[gameCenterChallengeVersionReleases]': fieldsGameCenterChallengeVersionReleases,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'include': include,
                'limit[gameCenterAppVersions]': limitGameCenterAppVersions,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
                'limit[achievementReleases]': limitAchievementReleases,
                'limit[activityReleases]': limitActivityReleases,
                'limit[challengeReleases]': limitChallengeReleases,
                'limit[leaderboardReleases]': limitLeaderboardReleases,
                'limit[leaderboardSetReleases]': limitLeaderboardSetReleases,
                'limit[challengesMinimumPlatformVersions]': limitChallengesMinimumPlatformVersions,
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
     * @deprecated
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns AppGameCenterEnabledVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsGameCenterEnabledVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppGameCenterEnabledVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/gameCenterEnabledVersions',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param filterPlatform filter by attribute 'platform'
     * @param filterVersionString filter by attribute 'versionString'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsGameCenterEnabledVersions the fields to include for returned resources of type gameCenterEnabledVersions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCompatibleVersions maximum number of related compatibleVersions returned (when they are included)
     * @returns GameCenterEnabledVersionsResponse List of GameCenterEnabledVersions
     * @throws ApiError
     */
    public static appsGameCenterEnabledVersionsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterVersionString?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'versionString' | '-versionString'>,
        fieldsGameCenterEnabledVersions?: Array<'platform' | 'versionString' | 'iconAsset' | 'compatibleVersions' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'compatibleVersions' | 'app'>,
        limitCompatibleVersions?: number,
    ): CancelablePromise<GameCenterEnabledVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/gameCenterEnabledVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[versionString]': filterVersionString,
                'filter[id]': filterId,
                'sort': sort,
                'fields[gameCenterEnabledVersions]': fieldsGameCenterEnabledVersions,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[compatibleVersions]': limitCompatibleVersions,
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
     * @deprecated
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns AppInAppPurchasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsInAppPurchasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppInAppPurchasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/inAppPurchases',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param filterInAppPurchaseType filter by attribute 'inAppPurchaseType'
     * @param filterCanBeSubmitted filter by canBeSubmitted
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitApps maximum number of related apps returned (when they are included)
     * @returns InAppPurchasesResponse List of InAppPurchases
     * @throws ApiError
     */
    public static appsInAppPurchasesGetToManyRelated(
        id: string,
        filterInAppPurchaseType?: Array<'AUTOMATICALLY_RENEWABLE_SUBSCRIPTION' | 'NON_CONSUMABLE' | 'CONSUMABLE' | 'NON_RENEWING_SUBSCRIPTION' | 'FREE_SUBSCRIPTION'>,
        filterCanBeSubmitted?: Array<string>,
        sort?: Array<'referenceName' | '-referenceName' | 'productId' | '-productId' | 'inAppPurchaseType' | '-inAppPurchaseType'>,
        fieldsInAppPurchases?: Array<'referenceName' | 'productId' | 'inAppPurchaseType' | 'state' | 'apps'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'apps'>,
        limitApps?: number,
    ): CancelablePromise<InAppPurchasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/inAppPurchases',
            path: {
                'id': id,
            },
            query: {
                'filter[inAppPurchaseType]': filterInAppPurchaseType,
                'filter[canBeSubmitted]': filterCanBeSubmitted,
                'sort': sort,
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[apps]': limitApps,
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
     * @returns AppInAppPurchasesV2LinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsInAppPurchasesV2GetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppInAppPurchasesV2LinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/inAppPurchasesV2',
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
     * @param filterProductId filter by attribute 'productId'
     * @param filterName filter by attribute 'name'
     * @param filterState filter by attribute 'state'
     * @param filterInAppPurchaseType filter by attribute 'inAppPurchaseType'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsInAppPurchaseLocalizations the fields to include for returned resources of type inAppPurchaseLocalizations
     * @param fieldsInAppPurchaseContents the fields to include for returned resources of type inAppPurchaseContents
     * @param fieldsInAppPurchaseAppStoreReviewScreenshots the fields to include for returned resources of type inAppPurchaseAppStoreReviewScreenshots
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsInAppPurchasePriceSchedules the fields to include for returned resources of type inAppPurchasePriceSchedules
     * @param fieldsInAppPurchaseAvailabilities the fields to include for returned resources of type inAppPurchaseAvailabilities
     * @param fieldsInAppPurchaseImages the fields to include for returned resources of type inAppPurchaseImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitInAppPurchaseLocalizations maximum number of related inAppPurchaseLocalizations returned (when they are included)
     * @param limitImages maximum number of related images returned (when they are included)
     * @returns InAppPurchasesV2Response List of InAppPurchases
     * @throws ApiError
     */
    public static appsInAppPurchasesV2GetToManyRelated(
        id: string,
        filterProductId?: Array<string>,
        filterName?: Array<string>,
        filterState?: Array<'MISSING_METADATA' | 'WAITING_FOR_UPLOAD' | 'PROCESSING_CONTENT' | 'READY_TO_SUBMIT' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'DEVELOPER_ACTION_NEEDED' | 'PENDING_BINARY_APPROVAL' | 'APPROVED' | 'DEVELOPER_REMOVED_FROM_SALE' | 'REMOVED_FROM_SALE' | 'REJECTED'>,
        filterInAppPurchaseType?: Array<'CONSUMABLE' | 'NON_CONSUMABLE' | 'NON_RENEWING_SUBSCRIPTION'>,
        sort?: Array<'name' | '-name' | 'inAppPurchaseType' | '-inAppPurchaseType'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsInAppPurchaseLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'inAppPurchaseV2'>,
        fieldsInAppPurchaseContents?: Array<'fileName' | 'fileSize' | 'url' | 'lastModifiedDate' | 'inAppPurchaseV2'>,
        fieldsInAppPurchaseAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'inAppPurchaseV2'>,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsInAppPurchasePriceSchedules?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsInAppPurchaseAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsInAppPurchaseImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'inAppPurchase'>,
        limit?: number,
        include?: Array<'inAppPurchaseLocalizations' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        limitInAppPurchaseLocalizations?: number,
        limitImages?: number,
    ): CancelablePromise<InAppPurchasesV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/inAppPurchasesV2',
            path: {
                'id': id,
            },
            query: {
                'filter[productId]': filterProductId,
                'filter[name]': filterName,
                'filter[state]': filterState,
                'filter[inAppPurchaseType]': filterInAppPurchaseType,
                'sort': sort,
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[inAppPurchaseLocalizations]': fieldsInAppPurchaseLocalizations,
                'fields[inAppPurchaseContents]': fieldsInAppPurchaseContents,
                'fields[inAppPurchaseAppStoreReviewScreenshots]': fieldsInAppPurchaseAppStoreReviewScreenshots,
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[inAppPurchasePriceSchedules]': fieldsInAppPurchasePriceSchedules,
                'fields[inAppPurchaseAvailabilities]': fieldsInAppPurchaseAvailabilities,
                'fields[inAppPurchaseImages]': fieldsInAppPurchaseImages,
                'limit': limit,
                'include': include,
                'limit[inAppPurchaseLocalizations]': limitInAppPurchaseLocalizations,
                'limit[images]': limitImages,
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
     * @returns AppMarketplaceSearchDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsMarketplaceSearchDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppMarketplaceSearchDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/marketplaceSearchDetail',
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
     * @param fieldsMarketplaceSearchDetails the fields to include for returned resources of type marketplaceSearchDetails
     * @returns MarketplaceSearchDetailResponse Single MarketplaceSearchDetail
     * @throws ApiError
     */
    public static appsMarketplaceSearchDetailGetToOneRelated(
        id: string,
        fieldsMarketplaceSearchDetails?: Array<'catalogUrl'>,
    ): CancelablePromise<MarketplaceSearchDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/marketplaceSearchDetail',
            path: {
                'id': id,
            },
            query: {
                'fields[marketplaceSearchDetails]': fieldsMarketplaceSearchDetails,
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
    public static appsPerfPowerMetricsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS'>,
        filterMetricType?: Array<'DISK' | 'HANG' | 'BATTERY' | 'LAUNCH' | 'MEMORY' | 'ANIMATION' | 'TERMINATION'>,
        filterDeviceType?: Array<string>,
    ): CancelablePromise<xcodeMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/perfPowerMetrics',
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
     * @param limit maximum resources per page
     * @returns AppPreReleaseVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsPreReleaseVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPreReleaseVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/preReleaseVersions',
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
     * @param fieldsPreReleaseVersions the fields to include for returned resources of type preReleaseVersions
     * @param limit maximum resources per page
     * @returns PreReleaseVersionsWithoutIncludesResponse List of PreReleaseVersions with get
     * @throws ApiError
     */
    public static appsPreReleaseVersionsGetToManyRelated(
        id: string,
        fieldsPreReleaseVersions?: Array<'version' | 'platform' | 'builds' | 'app'>,
        limit?: number,
    ): CancelablePromise<PreReleaseVersionsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/preReleaseVersions',
            path: {
                'id': id,
            },
            query: {
                'fields[preReleaseVersions]': fieldsPreReleaseVersions,
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
     * @returns AppPromotedPurchasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsPromotedPurchasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPromotedPurchasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/promotedPurchases',
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
    public static appsPromotedPurchasesReplaceToManyRelationship(
        id: string,
        requestBody: AppPromotedPurchasesLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/apps/{id}/relationships/promotedPurchases',
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
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns PromotedPurchasesResponse List of PromotedPurchases
     * @throws ApiError
     */
    public static appsPromotedPurchasesGetToManyRelated(
        id: string,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        limit?: number,
        include?: Array<'inAppPurchaseV2' | 'subscription'>,
    ): CancelablePromise<PromotedPurchasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/promotedPurchases',
            path: {
                'id': id,
            },
            query: {
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[subscriptions]': fieldsSubscriptions,
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
     * @returns AppReviewSubmissionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsReviewSubmissionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppReviewSubmissionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/reviewSubmissions',
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterState filter by attribute 'state'
     * @param fieldsReviewSubmissions the fields to include for returned resources of type reviewSubmissions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsReviewSubmissionItems the fields to include for returned resources of type reviewSubmissionItems
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsActors the fields to include for returned resources of type actors
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitItems maximum number of related items returned (when they are included)
     * @returns ReviewSubmissionsResponse List of ReviewSubmissions
     * @throws ApiError
     */
    public static appsReviewSubmissionsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterState?: Array<'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'UNRESOLVED_ISSUES' | 'CANCELING' | 'COMPLETING' | 'COMPLETE'>,
        fieldsReviewSubmissions?: Array<'platform' | 'submittedDate' | 'state' | 'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsReviewSubmissionItems?: Array<'state' | 'appStoreVersion' | 'appCustomProductPageVersion' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appEvent'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsActors?: Array<'actorType' | 'userFirstName' | 'userLastName' | 'userEmail' | 'apiKeyId'>,
        limit?: number,
        include?: Array<'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        limitItems?: number,
    ): CancelablePromise<ReviewSubmissionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/reviewSubmissions',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[state]': filterState,
                'fields[reviewSubmissions]': fieldsReviewSubmissions,
                'fields[apps]': fieldsApps,
                'fields[reviewSubmissionItems]': fieldsReviewSubmissionItems,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[actors]': fieldsActors,
                'limit': limit,
                'include': include,
                'limit[items]': limitItems,
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
     * @returns AppSubscriptionGracePeriodLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appsSubscriptionGracePeriodGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppSubscriptionGracePeriodLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/subscriptionGracePeriod',
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
     * @param fieldsSubscriptionGracePeriods the fields to include for returned resources of type subscriptionGracePeriods
     * @returns SubscriptionGracePeriodResponse Single SubscriptionGracePeriod
     * @throws ApiError
     */
    public static appsSubscriptionGracePeriodGetToOneRelated(
        id: string,
        fieldsSubscriptionGracePeriods?: Array<'optIn' | 'sandboxOptIn' | 'duration' | 'renewalType'>,
    ): CancelablePromise<SubscriptionGracePeriodResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/subscriptionGracePeriod',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionGracePeriods]': fieldsSubscriptionGracePeriods,
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
     * @returns AppSubscriptionGroupsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsSubscriptionGroupsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppSubscriptionGroupsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/subscriptionGroups',
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
     * @param filterReferenceName filter by attribute 'referenceName'
     * @param filterSubscriptionsState filter by attribute 'subscriptions.state'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsSubscriptionGroups the fields to include for returned resources of type subscriptionGroups
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionGroupLocalizations the fields to include for returned resources of type subscriptionGroupLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitSubscriptions maximum number of related subscriptions returned (when they are included)
     * @param limitSubscriptionGroupLocalizations maximum number of related subscriptionGroupLocalizations returned (when they are included)
     * @returns SubscriptionGroupsResponse List of SubscriptionGroups
     * @throws ApiError
     */
    public static appsSubscriptionGroupsGetToManyRelated(
        id: string,
        filterReferenceName?: Array<string>,
        filterSubscriptionsState?: Array<'MISSING_METADATA' | 'READY_TO_SUBMIT' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'DEVELOPER_ACTION_NEEDED' | 'PENDING_BINARY_APPROVAL' | 'APPROVED' | 'DEVELOPER_REMOVED_FROM_SALE' | 'REMOVED_FROM_SALE' | 'REJECTED'>,
        sort?: Array<'referenceName' | '-referenceName'>,
        fieldsSubscriptionGroups?: Array<'referenceName' | 'subscriptions' | 'subscriptionGroupLocalizations'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionGroupLocalizations?: Array<'name' | 'customAppName' | 'locale' | 'state' | 'subscriptionGroup'>,
        limit?: number,
        include?: Array<'subscriptions' | 'subscriptionGroupLocalizations'>,
        limitSubscriptions?: number,
        limitSubscriptionGroupLocalizations?: number,
    ): CancelablePromise<SubscriptionGroupsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/subscriptionGroups',
            path: {
                'id': id,
            },
            query: {
                'filter[referenceName]': filterReferenceName,
                'filter[subscriptions.state]': filterSubscriptionsState,
                'sort': sort,
                'fields[subscriptionGroups]': fieldsSubscriptionGroups,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionGroupLocalizations]': fieldsSubscriptionGroupLocalizations,
                'limit': limit,
                'include': include,
                'limit[subscriptions]': limitSubscriptions,
                'limit[subscriptionGroupLocalizations]': limitSubscriptionGroupLocalizations,
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
     * @returns AppWebhooksLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appsWebhooksGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppWebhooksLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/relationships/webhooks',
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
     * @param fieldsWebhooks the fields to include for returned resources of type webhooks
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns WebhooksResponse List of Webhooks
     * @throws ApiError
     */
    public static appsWebhooksGetToManyRelated(
        id: string,
        fieldsWebhooks?: Array<'enabled' | 'eventTypes' | 'name' | 'url' | 'app' | 'deliveries'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'app'>,
    ): CancelablePromise<WebhooksResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/webhooks',
            path: {
                'id': id,
            },
            query: {
                'fields[webhooks]': fieldsWebhooks,
                'fields[apps]': fieldsApps,
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
     * @param period the duration of the reporting period
     * @param groupBy the dimension by which to group the results
     * @param filterBetaTesters filter by 'betaTesters' relationship dimension
     * @param limit maximum number of groups to return per page
     * @returns AppsBetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static appsBetaTesterUsagesGetMetrics(
        id: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        groupBy?: Array<'betaTesters'>,
        filterBetaTesters?: string,
        limit?: number,
    ): CancelablePromise<AppsBetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'groupBy': groupBy,
                'filter[betaTesters]': filterBetaTesters,
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
