/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityImageResponse } from '../models/GameCenterActivityImageResponse';
import type { GameCenterActivityLocalizationCreateRequest } from '../models/GameCenterActivityLocalizationCreateRequest';
import type { GameCenterActivityLocalizationImageLinkageResponse } from '../models/GameCenterActivityLocalizationImageLinkageResponse';
import type { GameCenterActivityLocalizationResponse } from '../models/GameCenterActivityLocalizationResponse';
import type { GameCenterActivityLocalizationUpdateRequest } from '../models/GameCenterActivityLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterActivityLocalizationsService {
    /**
     * @param requestBody GameCenterActivityLocalization representation
     * @returns GameCenterActivityLocalizationResponse Single GameCenterActivityLocalization
     * @throws ApiError
     */
    public static gameCenterActivityLocalizationsCreateInstance(
        requestBody: GameCenterActivityLocalizationCreateRequest,
    ): CancelablePromise<GameCenterActivityLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivityLocalizations',
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
     * @param fieldsGameCenterActivityLocalizations the fields to include for returned resources of type gameCenterActivityLocalizations
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterActivityLocalizationResponse Single GameCenterActivityLocalization
     * @throws ApiError
     */
    public static gameCenterActivityLocalizationsGetInstance(
        id: string,
        fieldsGameCenterActivityLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        include?: Array<'version' | 'image'>,
    ): CancelablePromise<GameCenterActivityLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityLocalizations]': fieldsGameCenterActivityLocalizations,
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
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
     * @param requestBody GameCenterActivityLocalization representation
     * @returns GameCenterActivityLocalizationResponse Single GameCenterActivityLocalization
     * @throws ApiError
     */
    public static gameCenterActivityLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterActivityLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterActivityLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterActivityLocalizations/{id}',
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
    public static gameCenterActivityLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivityLocalizations/{id}',
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
     * @returns GameCenterActivityLocalizationImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterActivityLocalizationsImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterActivityLocalizationImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityLocalizations/{id}/relationships/image',
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
    public static gameCenterActivityLocalizationsImageGetToOneRelated(
        id: string,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterActivityImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityLocalizations/{id}/image',
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
}
