/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRatingDeclarationWithoutIncludesResponse } from '../models/AgeRatingDeclarationWithoutIncludesResponse';
import type { AlternativeDistributionPackageResponse } from '../models/AlternativeDistributionPackageResponse';
import type { AppClipDefaultExperienceResponse } from '../models/AppClipDefaultExperienceResponse';
import type { AppStoreReviewDetailResponse } from '../models/AppStoreReviewDetailResponse';
import type { AppStoreVersionAgeRatingDeclarationLinkageResponse } from '../models/AppStoreVersionAgeRatingDeclarationLinkageResponse';
import type { AppStoreVersionAlternativeDistributionPackageLinkageResponse } from '../models/AppStoreVersionAlternativeDistributionPackageLinkageResponse';
import type { AppStoreVersionAppClipDefaultExperienceLinkageRequest } from '../models/AppStoreVersionAppClipDefaultExperienceLinkageRequest';
import type { AppStoreVersionAppClipDefaultExperienceLinkageResponse } from '../models/AppStoreVersionAppClipDefaultExperienceLinkageResponse';
import type { AppStoreVersionAppStoreReviewDetailLinkageResponse } from '../models/AppStoreVersionAppStoreReviewDetailLinkageResponse';
import type { AppStoreVersionAppStoreVersionExperimentsLinkagesResponse } from '../models/AppStoreVersionAppStoreVersionExperimentsLinkagesResponse';
import type { AppStoreVersionAppStoreVersionExperimentsV2LinkagesResponse } from '../models/AppStoreVersionAppStoreVersionExperimentsV2LinkagesResponse';
import type { AppStoreVersionAppStoreVersionLocalizationsLinkagesResponse } from '../models/AppStoreVersionAppStoreVersionLocalizationsLinkagesResponse';
import type { AppStoreVersionAppStoreVersionPhasedReleaseLinkageResponse } from '../models/AppStoreVersionAppStoreVersionPhasedReleaseLinkageResponse';
import type { AppStoreVersionAppStoreVersionSubmissionLinkageResponse } from '../models/AppStoreVersionAppStoreVersionSubmissionLinkageResponse';
import type { AppStoreVersionBuildLinkageRequest } from '../models/AppStoreVersionBuildLinkageRequest';
import type { AppStoreVersionBuildLinkageResponse } from '../models/AppStoreVersionBuildLinkageResponse';
import type { AppStoreVersionCreateRequest } from '../models/AppStoreVersionCreateRequest';
import type { AppStoreVersionCustomerReviewsLinkagesResponse } from '../models/AppStoreVersionCustomerReviewsLinkagesResponse';
import type { AppStoreVersionExperimentsResponse } from '../models/AppStoreVersionExperimentsResponse';
import type { AppStoreVersionExperimentsV2Response } from '../models/AppStoreVersionExperimentsV2Response';
import type { AppStoreVersionGameCenterAppVersionLinkageResponse } from '../models/AppStoreVersionGameCenterAppVersionLinkageResponse';
import type { AppStoreVersionLocalizationsResponse } from '../models/AppStoreVersionLocalizationsResponse';
import type { AppStoreVersionPhasedReleaseWithoutIncludesResponse } from '../models/AppStoreVersionPhasedReleaseWithoutIncludesResponse';
import type { AppStoreVersionResponse } from '../models/AppStoreVersionResponse';
import type { AppStoreVersionRoutingAppCoverageLinkageResponse } from '../models/AppStoreVersionRoutingAppCoverageLinkageResponse';
import type { AppStoreVersionSubmissionResponse } from '../models/AppStoreVersionSubmissionResponse';
import type { AppStoreVersionUpdateRequest } from '../models/AppStoreVersionUpdateRequest';
import type { BuildWithoutIncludesResponse } from '../models/BuildWithoutIncludesResponse';
import type { CustomerReviewsResponse } from '../models/CustomerReviewsResponse';
import type { GameCenterAppVersionResponse } from '../models/GameCenterAppVersionResponse';
import type { RoutingAppCoverageWithoutIncludesResponse } from '../models/RoutingAppCoverageWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionsService {
    /**
     * @param requestBody AppStoreVersion representation
     * @returns AppStoreVersionResponse Single AppStoreVersion
     * @throws ApiError
     */
    public static appStoreVersionsCreateInstance(
        requestBody: AppStoreVersionCreateRequest,
    ): CancelablePromise<AppStoreVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersions',
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
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
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
     * @param limitAppStoreVersionExperiments maximum number of related appStoreVersionExperiments returned (when they are included)
     * @param limitAppStoreVersionExperimentsV2 maximum number of related appStoreVersionExperimentsV2 returned (when they are included)
     * @param limitAppStoreVersionLocalizations maximum number of related appStoreVersionLocalizations returned (when they are included)
     * @returns AppStoreVersionResponse Single AppStoreVersion
     * @throws ApiError
     */
    public static appStoreVersionsGetInstance(
        id: string,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
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
        limitAppStoreVersionExperiments?: number,
        limitAppStoreVersionExperimentsV2?: number,
        limitAppStoreVersionLocalizations?: number,
    ): CancelablePromise<AppStoreVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersions]': fieldsAppStoreVersions,
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
                'limit[appStoreVersionExperiments]': limitAppStoreVersionExperiments,
                'limit[appStoreVersionExperimentsV2]': limitAppStoreVersionExperimentsV2,
                'limit[appStoreVersionLocalizations]': limitAppStoreVersionLocalizations,
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
     * @param requestBody AppStoreVersion representation
     * @returns AppStoreVersionResponse Single AppStoreVersion
     * @throws ApiError
     */
    public static appStoreVersionsUpdateInstance(
        id: string,
        requestBody: AppStoreVersionUpdateRequest,
    ): CancelablePromise<AppStoreVersionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersions/{id}',
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
    public static appStoreVersionsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreVersions/{id}',
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
     * @deprecated
     * @param id the id of the requested resource
     * @returns AppStoreVersionAgeRatingDeclarationLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAgeRatingDeclarationGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAgeRatingDeclarationLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/ageRatingDeclaration',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsAgeRatingDeclarations the fields to include for returned resources of type ageRatingDeclarations
     * @returns AgeRatingDeclarationWithoutIncludesResponse Single AgeRatingDeclaration with get
     * @throws ApiError
     */
    public static appStoreVersionsAgeRatingDeclarationGetToOneRelated(
        id: string,
        fieldsAgeRatingDeclarations?: Array<'alcoholTobaccoOrDrugUseOrReferences' | 'contests' | 'gambling' | 'gamblingSimulated' | 'kidsAgeBand' | 'lootBox' | 'medicalOrTreatmentInformation' | 'profanityOrCrudeHumor' | 'sexualContentGraphicAndNudity' | 'sexualContentOrNudity' | 'horrorOrFearThemes' | 'matureOrSuggestiveThemes' | 'unrestrictedWebAccess' | 'violenceCartoonOrFantasy' | 'violenceRealisticProlongedGraphicOrSadistic' | 'violenceRealistic' | 'koreaAgeRatingOverride'>,
    ): CancelablePromise<AgeRatingDeclarationWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/ageRatingDeclaration',
            path: {
                'id': id,
            },
            query: {
                'fields[ageRatingDeclarations]': fieldsAgeRatingDeclarations,
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
     * @returns AppStoreVersionAlternativeDistributionPackageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAlternativeDistributionPackageGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAlternativeDistributionPackageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/alternativeDistributionPackage',
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
     * @param fieldsAlternativeDistributionPackages the fields to include for returned resources of type alternativeDistributionPackages
     * @param fieldsAlternativeDistributionPackageVersions the fields to include for returned resources of type alternativeDistributionPackageVersions
     * @param include comma-separated list of relationships to include
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns AlternativeDistributionPackageResponse Single AlternativeDistributionPackage
     * @throws ApiError
     */
    public static appStoreVersionsAlternativeDistributionPackageGetToOneRelated(
        id: string,
        fieldsAlternativeDistributionPackages?: Array<'versions'>,
        fieldsAlternativeDistributionPackageVersions?: Array<'url' | 'urlExpirationDate' | 'version' | 'fileChecksum' | 'state' | 'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        include?: Array<'versions'>,
        limitVersions?: number,
    ): CancelablePromise<AlternativeDistributionPackageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/alternativeDistributionPackage',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackages]': fieldsAlternativeDistributionPackages,
                'fields[alternativeDistributionPackageVersions]': fieldsAlternativeDistributionPackageVersions,
                'include': include,
                'limit[versions]': limitVersions,
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
     * @returns AppStoreVersionAppClipDefaultExperienceLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAppClipDefaultExperienceGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAppClipDefaultExperienceLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appClipDefaultExperience',
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
    public static appStoreVersionsAppClipDefaultExperienceUpdateToOneRelationship(
        id: string,
        requestBody: AppStoreVersionAppClipDefaultExperienceLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersions/{id}/relationships/appClipDefaultExperience',
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
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param fieldsAppClipAppStoreReviewDetails the fields to include for returned resources of type appClipAppStoreReviewDetails
     * @param include comma-separated list of relationships to include
     * @param limitAppClipDefaultExperienceLocalizations maximum number of related appClipDefaultExperienceLocalizations returned (when they are included)
     * @returns AppClipDefaultExperienceResponse Single AppClipDefaultExperience
     * @throws ApiError
     */
    public static appStoreVersionsAppClipDefaultExperienceGetToOneRelated(
        id: string,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        fieldsAppClipAppStoreReviewDetails?: Array<'invocationUrls' | 'appClipDefaultExperience'>,
        include?: Array<'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        limitAppClipDefaultExperienceLocalizations?: number,
    ): CancelablePromise<AppClipDefaultExperienceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appClipDefaultExperience',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'fields[appClips]': fieldsAppClips,
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
     * @returns AppStoreVersionAppStoreReviewDetailLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreReviewDetailGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAppStoreReviewDetailLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreReviewDetail',
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
     * @param fieldsAppStoreReviewDetails the fields to include for returned resources of type appStoreReviewDetails
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppStoreReviewAttachments the fields to include for returned resources of type appStoreReviewAttachments
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreReviewAttachments maximum number of related appStoreReviewAttachments returned (when they are included)
     * @returns AppStoreReviewDetailResponse Single AppStoreReviewDetail
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreReviewDetailGetToOneRelated(
        id: string,
        fieldsAppStoreReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'appStoreVersion' | 'appStoreReviewAttachments'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppStoreReviewAttachments?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreReviewDetail'>,
        include?: Array<'appStoreVersion' | 'appStoreReviewAttachments'>,
        limitAppStoreReviewAttachments?: number,
    ): CancelablePromise<AppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appStoreReviewDetail',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreReviewDetails]': fieldsAppStoreReviewDetails,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appStoreReviewAttachments]': fieldsAppStoreReviewAttachments,
                'include': include,
                'limit[appStoreReviewAttachments]': limitAppStoreReviewAttachments,
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
     * @returns AppStoreVersionAppStoreVersionExperimentsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionExperimentsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionAppStoreVersionExperimentsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreVersionExperiments',
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
     * @param filterState filter by attribute 'state'
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatments maximum number of related appStoreVersionExperimentTreatments returned (when they are included)
     * @returns AppStoreVersionExperimentsResponse List of AppStoreVersionExperiments
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionExperimentsGetToManyRelated(
        id: string,
        filterState?: Array<'PREPARE_FOR_SUBMISSION' | 'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'ACCEPTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'STOPPED'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        limit?: number,
        include?: Array<'appStoreVersion' | 'appStoreVersionExperimentTreatments'>,
        limitAppStoreVersionExperimentTreatments?: number,
    ): CancelablePromise<AppStoreVersionExperimentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appStoreVersionExperiments',
            path: {
                'id': id,
            },
            query: {
                'filter[state]': filterState,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'limit': limit,
                'include': include,
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
     * @returns AppStoreVersionAppStoreVersionExperimentsV2LinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionExperimentsV2GetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionAppStoreVersionExperimentsV2LinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreVersionExperimentsV2',
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
    public static appStoreVersionsAppStoreVersionExperimentsV2GetToManyRelated(
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
            url: '/v1/appStoreVersions/{id}/appStoreVersionExperimentsV2',
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
     * @returns AppStoreVersionAppStoreVersionLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionAppStoreVersionLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreVersionLocalizations',
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
     * @param fieldsAppStoreVersionLocalizations the fields to include for returned resources of type appStoreVersionLocalizations
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppScreenshotSets maximum number of related appScreenshotSets returned (when they are included)
     * @param limitAppPreviewSets maximum number of related appPreviewSets returned (when they are included)
     * @returns AppStoreVersionLocalizationsResponse List of AppStoreVersionLocalizations
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionLocalizationsGetToManyRelated(
        id: string,
        filterLocale?: Array<string>,
        fieldsAppStoreVersionLocalizations?: Array<'description' | 'locale' | 'keywords' | 'marketingUrl' | 'promotionalText' | 'supportUrl' | 'whatsNew' | 'appStoreVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limit?: number,
        include?: Array<'appStoreVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        limitAppScreenshotSets?: number,
        limitAppPreviewSets?: number,
    ): CancelablePromise<AppStoreVersionLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appStoreVersionLocalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[locale]': filterLocale,
                'fields[appStoreVersionLocalizations]': fieldsAppStoreVersionLocalizations,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
                'fields[appPreviewSets]': fieldsAppPreviewSets,
                'limit': limit,
                'include': include,
                'limit[appScreenshotSets]': limitAppScreenshotSets,
                'limit[appPreviewSets]': limitAppPreviewSets,
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
     * @returns AppStoreVersionAppStoreVersionPhasedReleaseLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionPhasedReleaseGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAppStoreVersionPhasedReleaseLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreVersionPhasedRelease',
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
     * @param fieldsAppStoreVersionPhasedReleases the fields to include for returned resources of type appStoreVersionPhasedReleases
     * @returns AppStoreVersionPhasedReleaseWithoutIncludesResponse Single AppStoreVersionPhasedRelease with get
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionPhasedReleaseGetToOneRelated(
        id: string,
        fieldsAppStoreVersionPhasedReleases?: Array<'phasedReleaseState' | 'startDate' | 'totalPauseDuration' | 'currentDayNumber'>,
    ): CancelablePromise<AppStoreVersionPhasedReleaseWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appStoreVersionPhasedRelease',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionPhasedReleases]': fieldsAppStoreVersionPhasedReleases,
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
     * @returns AppStoreVersionAppStoreVersionSubmissionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionSubmissionGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionAppStoreVersionSubmissionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/appStoreVersionSubmission',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsAppStoreVersionSubmissions the fields to include for returned resources of type appStoreVersionSubmissions
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param include comma-separated list of relationships to include
     * @returns AppStoreVersionSubmissionResponse Single AppStoreVersionSubmission
     * @throws ApiError
     */
    public static appStoreVersionsAppStoreVersionSubmissionGetToOneRelated(
        id: string,
        fieldsAppStoreVersionSubmissions?: Array<'appStoreVersion'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        include?: Array<'appStoreVersion'>,
    ): CancelablePromise<AppStoreVersionSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/appStoreVersionSubmission',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionSubmissions]': fieldsAppStoreVersionSubmissions,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
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
     * @returns AppStoreVersionBuildLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsBuildGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionBuildLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/build',
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
    public static appStoreVersionsBuildUpdateToOneRelationship(
        id: string,
        requestBody: AppStoreVersionBuildLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersions/{id}/relationships/build',
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
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @returns BuildWithoutIncludesResponse Single Build with get
     * @throws ApiError
     */
    public static appStoreVersionsBuildGetToOneRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
    ): CancelablePromise<BuildWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/build',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns AppStoreVersionCustomerReviewsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionsCustomerReviewsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionCustomerReviewsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/customerReviews',
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
    public static appStoreVersionsCustomerReviewsGetToManyRelated(
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
            url: '/v1/appStoreVersions/{id}/customerReviews',
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
     * @returns AppStoreVersionGameCenterAppVersionLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsGameCenterAppVersionGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionGameCenterAppVersionLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/gameCenterAppVersion',
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
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param include comma-separated list of relationships to include
     * @param limitCompatibilityVersions maximum number of related compatibilityVersions returned (when they are included)
     * @returns GameCenterAppVersionResponse Single GameCenterAppVersion
     * @throws ApiError
     */
    public static appStoreVersionsGameCenterAppVersionGetToOneRelated(
        id: string,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        include?: Array<'compatibilityVersions' | 'appStoreVersion'>,
        limitCompatibilityVersions?: number,
    ): CancelablePromise<GameCenterAppVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/gameCenterAppVersion',
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
     * @returns AppStoreVersionRoutingAppCoverageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appStoreVersionsRoutingAppCoverageGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppStoreVersionRoutingAppCoverageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/relationships/routingAppCoverage',
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
     * @param fieldsRoutingAppCoverages the fields to include for returned resources of type routingAppCoverages
     * @returns RoutingAppCoverageWithoutIncludesResponse Single RoutingAppCoverage with get
     * @throws ApiError
     */
    public static appStoreVersionsRoutingAppCoverageGetToOneRelated(
        id: string,
        fieldsRoutingAppCoverages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreVersion'>,
    ): CancelablePromise<RoutingAppCoverageWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersions/{id}/routingAppCoverage',
            path: {
                'id': id,
            },
            query: {
                'fields[routingAppCoverages]': fieldsRoutingAppCoverages,
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
