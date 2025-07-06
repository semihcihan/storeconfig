/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEncryptionDeclarationDocumentCreateRequest } from '../models/AppEncryptionDeclarationDocumentCreateRequest';
import type { AppEncryptionDeclarationDocumentResponse } from '../models/AppEncryptionDeclarationDocumentResponse';
import type { AppEncryptionDeclarationDocumentUpdateRequest } from '../models/AppEncryptionDeclarationDocumentUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEncryptionDeclarationDocumentsService {
    /**
     * @param requestBody AppEncryptionDeclarationDocument representation
     * @returns AppEncryptionDeclarationDocumentResponse Single AppEncryptionDeclarationDocument
     * @throws ApiError
     */
    public static appEncryptionDeclarationDocumentsCreateInstance(
        requestBody: AppEncryptionDeclarationDocumentCreateRequest,
    ): CancelablePromise<AppEncryptionDeclarationDocumentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEncryptionDeclarationDocuments',
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
     * @param fieldsAppEncryptionDeclarationDocuments the fields to include for returned resources of type appEncryptionDeclarationDocuments
     * @returns AppEncryptionDeclarationDocumentResponse Single AppEncryptionDeclarationDocument
     * @throws ApiError
     */
    public static appEncryptionDeclarationDocumentsGetInstance(
        id: string,
        fieldsAppEncryptionDeclarationDocuments?: Array<'fileSize' | 'fileName' | 'assetToken' | 'downloadUrl' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<AppEncryptionDeclarationDocumentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarationDocuments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEncryptionDeclarationDocuments]': fieldsAppEncryptionDeclarationDocuments,
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
     * @param requestBody AppEncryptionDeclarationDocument representation
     * @returns AppEncryptionDeclarationDocumentResponse Single AppEncryptionDeclarationDocument
     * @throws ApiError
     */
    public static appEncryptionDeclarationDocumentsUpdateInstance(
        id: string,
        requestBody: AppEncryptionDeclarationDocumentUpdateRequest,
    ): CancelablePromise<AppEncryptionDeclarationDocumentResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appEncryptionDeclarationDocuments/{id}',
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
