/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiIssueResponse } from '../models/CiIssueResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiIssuesService {
    /**
     * @param id the id of the requested resource
     * @param fieldsCiIssues the fields to include for returned resources of type ciIssues
     * @returns CiIssueResponse Single CiIssue
     * @throws ApiError
     */
    public static ciIssuesGetInstance(
        id: string,
        fieldsCiIssues?: Array<'issueType' | 'message' | 'fileSource' | 'category'>,
    ): CancelablePromise<CiIssueResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciIssues/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciIssues]': fieldsCiIssues,
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
