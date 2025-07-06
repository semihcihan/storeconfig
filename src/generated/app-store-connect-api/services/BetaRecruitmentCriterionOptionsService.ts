/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaRecruitmentCriterionOptionsResponse } from '../models/BetaRecruitmentCriterionOptionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaRecruitmentCriterionOptionsService {
    /**
     * @param fieldsBetaRecruitmentCriterionOptions the fields to include for returned resources of type betaRecruitmentCriterionOptions
     * @param limit maximum resources per page
     * @returns BetaRecruitmentCriterionOptionsResponse List of BetaRecruitmentCriterionOptions
     * @throws ApiError
     */
    public static betaRecruitmentCriterionOptionsGetCollection(
        fieldsBetaRecruitmentCriterionOptions?: Array<'deviceFamilyOsVersions'>,
        limit?: number,
    ): CancelablePromise<BetaRecruitmentCriterionOptionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaRecruitmentCriterionOptions',
            query: {
                'fields[betaRecruitmentCriterionOptions]': fieldsBetaRecruitmentCriterionOptions,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
