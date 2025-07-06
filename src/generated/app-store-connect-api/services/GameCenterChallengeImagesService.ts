/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeImageCreateRequest } from '../models/GameCenterChallengeImageCreateRequest';
import type { GameCenterChallengeImageResponse } from '../models/GameCenterChallengeImageResponse';
import type { GameCenterChallengeImageUpdateRequest } from '../models/GameCenterChallengeImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterChallengeImagesService {
    /**
     * @param requestBody GameCenterChallengeImage representation
     * @returns GameCenterChallengeImageResponse Single GameCenterChallengeImage
     * @throws ApiError
     */
    public static gameCenterChallengeImagesCreateInstance(
        requestBody: GameCenterChallengeImageCreateRequest,
    ): CancelablePromise<GameCenterChallengeImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterChallengeImages',
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
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @returns GameCenterChallengeImageResponse Single GameCenterChallengeImage
     * @throws ApiError
     */
    public static gameCenterChallengeImagesGetInstance(
        id: string,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterChallengeImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeImages/{id}',
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
    /**
     * @param id the id of the requested resource
     * @param requestBody GameCenterChallengeImage representation
     * @returns GameCenterChallengeImageResponse Single GameCenterChallengeImage
     * @throws ApiError
     */
    public static gameCenterChallengeImagesUpdateInstance(
        id: string,
        requestBody: GameCenterChallengeImageUpdateRequest,
    ): CancelablePromise<GameCenterChallengeImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterChallengeImages/{id}',
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
    public static gameCenterChallengeImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterChallengeImages/{id}',
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
}
