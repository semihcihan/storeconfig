/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessibilityDeclarationCreateRequest } from '../models/AccessibilityDeclarationCreateRequest';
import type { AccessibilityDeclarationResponse } from '../models/AccessibilityDeclarationResponse';
import type { AccessibilityDeclarationUpdateRequest } from '../models/AccessibilityDeclarationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccessibilityDeclarationsService {
    /**
     * @param requestBody AccessibilityDeclaration representation
     * @returns AccessibilityDeclarationResponse Single AccessibilityDeclaration
     * @throws ApiError
     */
    public static accessibilityDeclarationsCreateInstance(
        requestBody: AccessibilityDeclarationCreateRequest,
    ): CancelablePromise<AccessibilityDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/accessibilityDeclarations',
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
     * @param fieldsAccessibilityDeclarations the fields to include for returned resources of type accessibilityDeclarations
     * @returns AccessibilityDeclarationResponse Single AccessibilityDeclaration
     * @throws ApiError
     */
    public static accessibilityDeclarationsGetInstance(
        id: string,
        fieldsAccessibilityDeclarations?: Array<'deviceFamily' | 'state' | 'supportsAudioDescriptions' | 'supportsCaptions' | 'supportsDarkInterface' | 'supportsDifferentiateWithoutColorAlone' | 'supportsLargerText' | 'supportsReducedMotion' | 'supportsSufficientContrast' | 'supportsVoiceControl' | 'supportsVoiceover'>,
    ): CancelablePromise<AccessibilityDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/accessibilityDeclarations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[accessibilityDeclarations]': fieldsAccessibilityDeclarations,
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
     * @param requestBody AccessibilityDeclaration representation
     * @returns AccessibilityDeclarationResponse Single AccessibilityDeclaration
     * @throws ApiError
     */
    public static accessibilityDeclarationsUpdateInstance(
        id: string,
        requestBody: AccessibilityDeclarationUpdateRequest,
    ): CancelablePromise<AccessibilityDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/accessibilityDeclarations/{id}',
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
    public static accessibilityDeclarationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/accessibilityDeclarations/{id}',
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
