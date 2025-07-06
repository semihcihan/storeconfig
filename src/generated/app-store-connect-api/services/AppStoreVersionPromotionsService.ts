/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionPromotionCreateRequest } from '../models/AppStoreVersionPromotionCreateRequest';
import type { AppStoreVersionPromotionResponse } from '../models/AppStoreVersionPromotionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionPromotionsService {
    /**
     * @param requestBody AppStoreVersionPromotion representation
     * @returns AppStoreVersionPromotionResponse Single AppStoreVersionPromotion
     * @throws ApiError
     */
    public static appStoreVersionPromotionsCreateInstance(
        requestBody: AppStoreVersionPromotionCreateRequest,
    ): CancelablePromise<AppStoreVersionPromotionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionPromotions',
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
}
