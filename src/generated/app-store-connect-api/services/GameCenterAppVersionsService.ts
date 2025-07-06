/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionResponse } from '../models/AppStoreVersionResponse';
import type { GameCenterAppVersionAppStoreVersionLinkageResponse } from '../models/GameCenterAppVersionAppStoreVersionLinkageResponse';
import type { GameCenterAppVersionCompatibilityVersionsLinkagesRequest } from '../models/GameCenterAppVersionCompatibilityVersionsLinkagesRequest';
import type { GameCenterAppVersionCompatibilityVersionsLinkagesResponse } from '../models/GameCenterAppVersionCompatibilityVersionsLinkagesResponse';
import type { GameCenterAppVersionCreateRequest } from '../models/GameCenterAppVersionCreateRequest';
import type { GameCenterAppVersionResponse } from '../models/GameCenterAppVersionResponse';
import type { GameCenterAppVersionsResponse } from '../models/GameCenterAppVersionsResponse';
import type { GameCenterAppVersionUpdateRequest } from '../models/GameCenterAppVersionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterAppVersionsService {
    /**
     * @param requestBody GameCenterAppVersion representation
     * @returns GameCenterAppVersionResponse Single GameCenterAppVersion
     * @throws ApiError
     */
    public static gameCenterAppVersionsCreateInstance(
        requestBody: GameCenterAppVersionCreateRequest,
    ): CancelablePromise<GameCenterAppVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAppVersions',
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
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param include comma-separated list of relationships to include
     * @param limitCompatibilityVersions maximum number of related compatibilityVersions returned (when they are included)
     * @returns GameCenterAppVersionResponse Single GameCenterAppVersion
     * @throws ApiError
     */
    public static gameCenterAppVersionsGetInstance(
        id: string,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        include?: Array<'compatibilityVersions' | 'appStoreVersion'>,
        limitCompatibilityVersions?: number,
    ): CancelablePromise<GameCenterAppVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAppVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'include': include,
                'limit[compatibilityVersions]': limitCompatibilityVersions,
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
     * @param requestBody GameCenterAppVersion representation
     * @returns GameCenterAppVersionResponse Single GameCenterAppVersion
     * @throws ApiError
     */
    public static gameCenterAppVersionsUpdateInstance(
        id: string,
        requestBody: GameCenterAppVersionUpdateRequest,
    ): CancelablePromise<GameCenterAppVersionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAppVersions/{id}',
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
     * @returns GameCenterAppVersionAppStoreVersionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterAppVersionsAppStoreVersionGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterAppVersionAppStoreVersionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAppVersions/{id}/relationships/appStoreVersion',
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
    public static gameCenterAppVersionsAppStoreVersionGetToOneRelated(
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
            url: '/v1/gameCenterAppVersions/{id}/appStoreVersion',
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
     * @param limit maximum resources per page
     * @returns GameCenterAppVersionCompatibilityVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterAppVersionsCompatibilityVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterAppVersionCompatibilityVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAppVersions/{id}/relationships/compatibilityVersions',
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
    public static gameCenterAppVersionsCompatibilityVersionsCreateToManyRelationship(
        id: string,
        requestBody: GameCenterAppVersionCompatibilityVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAppVersions/{id}/relationships/compatibilityVersions',
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
    public static gameCenterAppVersionsCompatibilityVersionsDeleteToManyRelationship(
        id: string,
        requestBody: GameCenterAppVersionCompatibilityVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterAppVersions/{id}/relationships/compatibilityVersions',
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
     * @param filterEnabled filter by attribute 'enabled'
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCompatibilityVersions maximum number of related compatibilityVersions returned (when they are included)
     * @returns GameCenterAppVersionsResponse List of GameCenterAppVersions
     * @throws ApiError
     */
    public static gameCenterAppVersionsCompatibilityVersionsGetToManyRelated(
        id: string,
        filterEnabled?: Array<string>,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        limit?: number,
        include?: Array<'compatibilityVersions' | 'appStoreVersion'>,
        limitCompatibilityVersions?: number,
    ): CancelablePromise<GameCenterAppVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAppVersions/{id}/compatibilityVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[enabled]': filterEnabled,
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'limit': limit,
                'include': include,
                'limit[compatibilityVersions]': limitCompatibilityVersions,
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
