/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaTesterInvitationCreateRequest } from '../models/BetaTesterInvitationCreateRequest';
import type { BetaTesterInvitationResponse } from '../models/BetaTesterInvitationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaTesterInvitationsService {
    /**
     * @param requestBody BetaTesterInvitation representation
     * @returns BetaTesterInvitationResponse Single BetaTesterInvitation
     * @throws ApiError
     */
    public static betaTesterInvitationsCreateInstance(
        requestBody: BetaTesterInvitationCreateRequest,
    ): CancelablePromise<BetaTesterInvitationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaTesterInvitations',
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
