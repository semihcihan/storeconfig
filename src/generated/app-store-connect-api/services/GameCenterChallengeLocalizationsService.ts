/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeImageResponse } from '../models/GameCenterChallengeImageResponse';
import type { GameCenterChallengeLocalizationCreateRequest } from '../models/GameCenterChallengeLocalizationCreateRequest';
import type { GameCenterChallengeLocalizationImageLinkageResponse } from '../models/GameCenterChallengeLocalizationImageLinkageResponse';
import type { GameCenterChallengeLocalizationResponse } from '../models/GameCenterChallengeLocalizationResponse';
import type { GameCenterChallengeLocalizationUpdateRequest } from '../models/GameCenterChallengeLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterChallengeLocalizationsService {
    /**
     * @param requestBody GameCenterChallengeLocalization representation
     * @returns GameCenterChallengeLocalizationResponse Single GameCenterChallengeLocalization
     * @throws ApiError
     */
    public static gameCenterChallengeLocalizationsCreateInstance(
        requestBody: GameCenterChallengeLocalizationCreateRequest,
    ): CancelablePromise<GameCenterChallengeLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterChallengeLocalizations',
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
     * @param fieldsGameCenterChallengeLocalizations the fields to include for returned resources of type gameCenterChallengeLocalizations
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterChallengeLocalizationResponse Single GameCenterChallengeLocalization
     * @throws ApiError
     */
    public static gameCenterChallengeLocalizationsGetInstance(
        id: string,
        fieldsGameCenterChallengeLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        include?: Array<'version' | 'image'>,
    ): CancelablePromise<GameCenterChallengeLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeLocalizations]': fieldsGameCenterChallengeLocalizations,
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
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
     * @param requestBody GameCenterChallengeLocalization representation
     * @returns GameCenterChallengeLocalizationResponse Single GameCenterChallengeLocalization
     * @throws ApiError
     */
    public static gameCenterChallengeLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterChallengeLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterChallengeLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterChallengeLocalizations/{id}',
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
    public static gameCenterChallengeLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterChallengeLocalizations/{id}',
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
     * @returns GameCenterChallengeLocalizationImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterChallengeLocalizationsImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterChallengeLocalizationImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeLocalizations/{id}/relationships/image',
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
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @returns GameCenterChallengeImageResponse Single GameCenterChallengeImage
     * @throws ApiError
     */
    public static gameCenterChallengeLocalizationsImageGetToOneRelated(
        id: string,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterChallengeImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeLocalizations/{id}/image',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
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
