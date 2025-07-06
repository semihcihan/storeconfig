/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityImageResponse } from '../models/GameCenterActivityImageResponse';
import type { GameCenterActivityLocalizationsResponse } from '../models/GameCenterActivityLocalizationsResponse';
import type { GameCenterActivityVersionCreateRequest } from '../models/GameCenterActivityVersionCreateRequest';
import type { GameCenterActivityVersionDefaultImageLinkageResponse } from '../models/GameCenterActivityVersionDefaultImageLinkageResponse';
import type { GameCenterActivityVersionLocalizationsLinkagesResponse } from '../models/GameCenterActivityVersionLocalizationsLinkagesResponse';
import type { GameCenterActivityVersionResponse } from '../models/GameCenterActivityVersionResponse';
import type { GameCenterActivityVersionUpdateRequest } from '../models/GameCenterActivityVersionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterActivityVersionsService {
    /**
     * @param requestBody GameCenterActivityVersion representation
     * @returns GameCenterActivityVersionResponse Single GameCenterActivityVersion
     * @throws ApiError
     */
    public static gameCenterActivityVersionsCreateInstance(
        requestBody: GameCenterActivityVersionCreateRequest,
    ): CancelablePromise<GameCenterActivityVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivityVersions',
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
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param fieldsGameCenterActivityLocalizations the fields to include for returned resources of type gameCenterActivityLocalizations
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterActivityVersionResponse Single GameCenterActivityVersion
     * @throws ApiError
     */
    public static gameCenterActivityVersionsGetInstance(
        id: string,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        fieldsGameCenterActivityLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        include?: Array<'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterActivityVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
                'fields[gameCenterActivityLocalizations]': fieldsGameCenterActivityLocalizations,
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
                'include': include,
                'limit[localizations]': limitLocalizations,
                'limit[releases]': limitReleases,
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
     * @param requestBody GameCenterActivityVersion representation
     * @returns GameCenterActivityVersionResponse Single GameCenterActivityVersion
     * @throws ApiError
     */
    public static gameCenterActivityVersionsUpdateInstance(
        id: string,
        requestBody: GameCenterActivityVersionUpdateRequest,
    ): CancelablePromise<GameCenterActivityVersionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterActivityVersions/{id}',
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
     * @returns GameCenterActivityVersionDefaultImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterActivityVersionsDefaultImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterActivityVersionDefaultImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersions/{id}/relationships/defaultImage',
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
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @returns GameCenterActivityImageResponse Single GameCenterActivityImage
     * @throws ApiError
     */
    public static gameCenterActivityVersionsDefaultImageGetToOneRelated(
        id: string,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterActivityImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersions/{id}/defaultImage',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
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
     * @returns GameCenterActivityVersionLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterActivityVersionsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterActivityVersionLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersions/{id}/relationships/localizations',
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
     * @param fieldsGameCenterActivityLocalizations the fields to include for returned resources of type gameCenterActivityLocalizations
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterActivityLocalizationsResponse List of GameCenterActivityLocalizations
     * @throws ApiError
     */
    public static gameCenterActivityVersionsLocalizationsGetToManyRelated(
        id: string,
        fieldsGameCenterActivityLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        limit?: number,
        include?: Array<'version' | 'image'>,
    ): CancelablePromise<GameCenterActivityLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersions/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityLocalizations]': fieldsGameCenterActivityLocalizations,
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
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
