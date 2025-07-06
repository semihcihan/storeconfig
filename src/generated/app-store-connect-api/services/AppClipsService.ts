/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAdvancedExperiencesResponse } from '../models/AppClipAdvancedExperiencesResponse';
import type { AppClipAppClipAdvancedExperiencesLinkagesResponse } from '../models/AppClipAppClipAdvancedExperiencesLinkagesResponse';
import type { AppClipAppClipDefaultExperiencesLinkagesResponse } from '../models/AppClipAppClipDefaultExperiencesLinkagesResponse';
import type { AppClipDefaultExperiencesResponse } from '../models/AppClipDefaultExperiencesResponse';
import type { AppClipResponse } from '../models/AppClipResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param include comma-separated list of relationships to include
     * @param limitAppClipDefaultExperiences maximum number of related appClipDefaultExperiences returned (when they are included)
     * @returns AppClipResponse Single AppClip
     * @throws ApiError
     */
    public static appClipsGetInstance(
        id: string,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        include?: Array<'app' | 'appClipDefaultExperiences'>,
        limitAppClipDefaultExperiences?: number,
    ): CancelablePromise<AppClipResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClips/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClips]': fieldsAppClips,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
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
     * @returns AppClipAppClipAdvancedExperiencesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appClipsAppClipAdvancedExperiencesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppClipAppClipAdvancedExperiencesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClips/{id}/relationships/appClipAdvancedExperiences',
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
     * @param filterStatus filter by attribute 'status'
     * @param filterPlaceStatus filter by attribute 'placeStatus'
     * @param filterAction filter by attribute 'action'
     * @param fieldsAppClipAdvancedExperiences the fields to include for returned resources of type appClipAdvancedExperiences
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsAppClipAdvancedExperienceImages the fields to include for returned resources of type appClipAdvancedExperienceImages
     * @param fieldsAppClipAdvancedExperienceLocalizations the fields to include for returned resources of type appClipAdvancedExperienceLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @returns AppClipAdvancedExperiencesResponse List of AppClipAdvancedExperiences
     * @throws ApiError
     */
    public static appClipsAppClipAdvancedExperiencesGetToManyRelated(
        id: string,
        filterStatus?: Array<'RECEIVED' | 'DEACTIVATED' | 'APP_TRANSFER_IN_PROGRESS'>,
        filterPlaceStatus?: Array<'PENDING' | 'MATCHED' | 'NO_MATCH'>,
        filterAction?: Array<'OPEN' | 'VIEW' | 'PLAY'>,
        fieldsAppClipAdvancedExperiences?: Array<'link' | 'version' | 'status' | 'action' | 'isPoweredBy' | 'place' | 'placeStatus' | 'businessCategory' | 'defaultLanguage' | 'appClip' | 'headerImage' | 'localizations'>,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsAppClipAdvancedExperienceImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        fieldsAppClipAdvancedExperienceLocalizations?: Array<'language' | 'title' | 'subtitle'>,
        limit?: number,
        include?: Array<'appClip' | 'headerImage' | 'localizations'>,
        limitLocalizations?: number,
    ): CancelablePromise<AppClipAdvancedExperiencesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClips/{id}/appClipAdvancedExperiences',
            path: {
                'id': id,
            },
            query: {
                'filter[status]': filterStatus,
                'filter[placeStatus]': filterPlaceStatus,
                'filter[action]': filterAction,
                'fields[appClipAdvancedExperiences]': fieldsAppClipAdvancedExperiences,
                'fields[appClips]': fieldsAppClips,
                'fields[appClipAdvancedExperienceImages]': fieldsAppClipAdvancedExperienceImages,
                'fields[appClipAdvancedExperienceLocalizations]': fieldsAppClipAdvancedExperienceLocalizations,
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
     * @returns AppClipAppClipDefaultExperiencesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appClipsAppClipDefaultExperiencesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppClipAppClipDefaultExperiencesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClips/{id}/relationships/appClipDefaultExperiences',
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
     * @param existsReleaseWithAppStoreVersion filter by existence or non-existence of related 'releaseWithAppStoreVersion'
     * @param fieldsAppClipDefaultExperiences the fields to include for returned resources of type appClipDefaultExperiences
     * @param fieldsAppClips the fields to include for returned resources of type appClips
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param fieldsAppClipAppStoreReviewDetails the fields to include for returned resources of type appClipAppStoreReviewDetails
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppClipDefaultExperienceLocalizations maximum number of related appClipDefaultExperienceLocalizations returned (when they are included)
     * @returns AppClipDefaultExperiencesResponse List of AppClipDefaultExperiences
     * @throws ApiError
     */
    public static appClipsAppClipDefaultExperiencesGetToManyRelated(
        id: string,
        existsReleaseWithAppStoreVersion?: boolean,
        fieldsAppClipDefaultExperiences?: Array<'action' | 'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        fieldsAppClips?: Array<'bundleId' | 'app' | 'appClipDefaultExperiences' | 'appClipAdvancedExperiences'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        fieldsAppClipAppStoreReviewDetails?: Array<'invocationUrls' | 'appClipDefaultExperience'>,
        limit?: number,
        include?: Array<'appClip' | 'releaseWithAppStoreVersion' | 'appClipDefaultExperienceLocalizations' | 'appClipAppStoreReviewDetail'>,
        limitAppClipDefaultExperienceLocalizations?: number,
    ): CancelablePromise<AppClipDefaultExperiencesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClips/{id}/appClipDefaultExperiences',
            path: {
                'id': id,
            },
            query: {
                'exists[releaseWithAppStoreVersion]': existsReleaseWithAppStoreVersion,
                'fields[appClipDefaultExperiences]': fieldsAppClipDefaultExperiences,
                'fields[appClips]': fieldsAppClips,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appClipDefaultExperienceLocalizations]': fieldsAppClipDefaultExperienceLocalizations,
                'fields[appClipAppStoreReviewDetails]': fieldsAppClipAppStoreReviewDetails,
                'limit': limit,
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
}
