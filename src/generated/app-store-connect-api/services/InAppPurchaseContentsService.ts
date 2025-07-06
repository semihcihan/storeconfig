/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseContentResponse } from '../models/InAppPurchaseContentResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseContentsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsInAppPurchaseContents the fields to include for returned resources of type inAppPurchaseContents
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseContentResponse Single InAppPurchaseContent
     * @throws ApiError
     */
    public static inAppPurchaseContentsGetInstance(
        id: string,
        fieldsInAppPurchaseContents?: Array<'fileName' | 'fileSize' | 'url' | 'lastModifiedDate' | 'inAppPurchaseV2'>,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseContentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseContents/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseContents]': fieldsInAppPurchaseContents,
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
}
