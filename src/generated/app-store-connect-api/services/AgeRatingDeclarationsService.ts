/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRatingDeclarationResponse } from '../models/AgeRatingDeclarationResponse';
import type { AgeRatingDeclarationUpdateRequest } from '../models/AgeRatingDeclarationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgeRatingDeclarationsService {
    /**
     * @param id the id of the requested resource
     * @param requestBody AgeRatingDeclaration representation
     * @returns AgeRatingDeclarationResponse Single AgeRatingDeclaration
     * @throws ApiError
     */
    public static ageRatingDeclarationsUpdateInstance(
        id: string,
        requestBody: AgeRatingDeclarationUpdateRequest,
    ): CancelablePromise<AgeRatingDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/ageRatingDeclarations/{id}',
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
}
