/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAppStoreReviewDetailResponse } from '../models/AppClipAppStoreReviewDetailResponse';
import type { AppClipDefaultExperienceAppClipAppStoreReviewDetailLinkageResponse } from '../models/AppClipDefaultExperienceAppClipAppStoreReviewDetailLinkageResponse';
import type { AppClipDefaultExperienceAppClipDefaultExperienceLocalizationsLinkagesResponse } from '../models/AppClipDefaultExperienceAppClipDefaultExperienceLocalizationsLinkagesResponse';
import type { AppClipDefaultExperienceCreateRequest } from '../models/AppClipDefaultExperienceCreateRequest';
import type { AppClipDefaultExperienceLocalizationsResponse } from '../models/AppClipDefaultExperienceLocalizationsResponse';
import type { AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageRequest } from '../models/AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageRequest';
import type { AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageResponse } from '../models/AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageResponse';
import type { AppClipDefaultExperienceResponse } from '../models/AppClipDefaultExperienceResponse';
import type { AppClipDefaultExperienceUpdateRequest } from '../models/AppClipDefaultExperienceUpdateRequest';
import type { AppStoreVersionResponse } from '../models/AppStoreVersionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipDefaultExperiencesService {
    /**
     * @param requestBody AppClipDefaultExperience representation
     * @returns AppClipDefaultExperienceResponse Single AppClipDefaultExperience
     * @throws ApiError
     */
    public static appClipDefaultExperiencesCreateInstance(
        requestBody: AppClipDefaultExperienceCreateRequest,
    ): CancelablePromise<AppClipDefaultExperienceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipDefaultExperiences',
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
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param fieldsAppClipAppStoreReviewDetails the fields to include for returned resources of type appClipAppStoreReviewDetails
     * @param include comma-separated list of relationships to include
     * @param limitAppClipDefaultExperienceLocalizations maximum number of related appClipDefaultExperienceLocalizations returned (when they are included)
     * @returns AppClipDefaultExperienceResponse Single AppClipDefaultExperience
     * @throws ApiError
     */
    public static appClipDefaultExperiencesGetInstance(
        id: string,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        fieldsAppClipAppStoreReviewDetails?: Array<'invocationUrls' | 'appClipDefaultExperience'>,
        include?: Array<'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        limitAppClipDefaultExperienceLocalizations?: number,
    ): CancelablePromise<AppClipDefaultExperienceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appClipDefaultExperienceLocalizations]': fieldsAppClipDefaultExperienceLocalizations,
                'fields[appClipAppStoreReviewDetails]': fieldsAppClipAppStoreReviewDetails,
                'include': include,
                'limit[appClipDefaultExperienceLocalizations]': limitAppClipDefaultExperienceLocalizations,
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
     * @param requestBody AppClipDefaultExperience representation
     * @returns AppClipDefaultExperienceResponse Single AppClipDefaultExperience
     * @throws ApiError
     */
    public static appClipDefaultExperiencesUpdateInstance(
        id: string,
        requestBody: AppClipDefaultExperienceUpdateRequest,
    ): CancelablePromise<AppClipDefaultExperienceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipDefaultExperiences/{id}',
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
    public static appClipDefaultExperiencesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appClipDefaultExperiences/{id}',
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
     * @returns AppClipDefaultExperienceAppClipAppStoreReviewDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appClipDefaultExperiencesAppClipAppStoreReviewDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppClipDefaultExperienceAppClipAppStoreReviewDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}/relationships/appClipAppStoreReviewDetail',
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
     * @param fieldsAppClipAppStoreReviewDetails the fields to include for returned resources of type appClipAppStoreReviewDetails
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param include comma-separated list of relationships to include
     * @returns AppClipAppStoreReviewDetailResponse Single AppClipAppStoreReviewDetail
     * @throws ApiError
     */
    public static appClipDefaultExperiencesAppClipAppStoreReviewDetailGetToOneRelated(
        id: string,
        fieldsAppClipAppStoreReviewDetails?: Array<'invocationUrls' | 'appClipDefaultExperience'>,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        include?: Array<'appClipDefaultExperience'>,
    ): CancelablePromise<AppClipAppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}/appClipAppStoreReviewDetail',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipAppStoreReviewDetails]': fieldsAppClipAppStoreReviewDetails,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
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
     * @returns AppClipDefaultExperienceAppClipDefaultExperienceLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appClipDefaultExperiencesAppClipDefaultExperienceLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppClipDefaultExperienceAppClipDefaultExperienceLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}/relationships/appClipDefaultExperienceLocalizations',
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
     * @param filterLocale filter by attribute 'locale'
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param fieldsAppClipHeaderImages the fields to include for returned resources of type appClipHeaderImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppClipDefaultExperienceLocalizationsResponse List of AppClipDefaultExperienceLocalizations
     * @throws ApiError
     */
    public static appClipDefaultExperiencesAppClipDefaultExperienceLocalizationsGetToManyRelated(
        id: string,
        filterLocale?: Array<string>,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        fieldsAppClipHeaderImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'appClipDefaultExperienceLocalization'>,
        limit?: number,
        include?: Array<'appClipDefaultExperience' | 'appClipHeaderImage'>,
    ): CancelablePromise<AppClipDefaultExperienceLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}/appClipDefaultExperienceLocalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[locale]': filterLocale,
                'fields[appClipDefaultExperienceLocalizations]': fieldsAppClipDefaultExperienceLocalizations,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'fields[appClipHeaderImages]': fieldsAppClipHeaderImages,
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
     * @returns AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appClipDefaultExperiencesReleaseWithAppStoreVersionGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperiences/{id}/relationships/releaseWithAppStoreVersion',
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
    public static appClipDefaultExperiencesReleaseWithAppStoreVersionUpdateToOneRelationship(
        id: string,
        requestBody: AppClipDefaultExperienceReleaseWithAppStoreVersionLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipDefaultExperiences/{id}/relationships/releaseWithAppStoreVersion',
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
    public static appClipDefaultExperiencesReleaseWithAppStoreVersionGetToOneRelated(
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
            url: '/v1/appClipDefaultExperiences/{id}/releaseWithAppStoreVersion',
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
}
