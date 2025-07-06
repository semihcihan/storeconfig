/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaRecruitmentCriterionCreateRequest } from '../models/BetaRecruitmentCriterionCreateRequest';
import type { BetaRecruitmentCriterionResponse } from '../models/BetaRecruitmentCriterionResponse';
import type { BetaRecruitmentCriterionUpdateRequest } from '../models/BetaRecruitmentCriterionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaRecruitmentCriteriaService {
    /**
     * @param requestBody BetaRecruitmentCriterion representation
     * @returns BetaRecruitmentCriterionResponse Single BetaRecruitmentCriterion
     * @throws ApiError
     */
    public static betaRecruitmentCriteriaCreateInstance(
        requestBody: BetaRecruitmentCriterionCreateRequest,
    ): CancelablePromise<BetaRecruitmentCriterionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaRecruitmentCriteria',
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
     * @param requestBody BetaRecruitmentCriterion representation
     * @returns BetaRecruitmentCriterionResponse Single BetaRecruitmentCriterion
     * @throws ApiError
     */
    public static betaRecruitmentCriteriaUpdateInstance(
        id: string,
        requestBody: BetaRecruitmentCriterionUpdateRequest,
    ): CancelablePromise<BetaRecruitmentCriterionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaRecruitmentCriteria/{id}',
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
    public static betaRecruitmentCriteriaDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaRecruitmentCriteria/{id}',
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
