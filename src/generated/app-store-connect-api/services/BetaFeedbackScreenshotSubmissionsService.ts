/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaFeedbackScreenshotSubmissionResponse } from '../models/BetaFeedbackScreenshotSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaFeedbackScreenshotSubmissionsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsBetaFeedbackScreenshotSubmissions the fields to include for returned resources of type betaFeedbackScreenshotSubmissions
     * @param include comma-separated list of relationships to include
     * @returns BetaFeedbackScreenshotSubmissionResponse Single BetaFeedbackScreenshotSubmission
     * @throws ApiError
     */
    public static betaFeedbackScreenshotSubmissionsGetInstance(
        id: string,
        fieldsBetaFeedbackScreenshotSubmissions?: Array<'createdDate' | 'comment' | 'email' | 'deviceModel' | 'osVersion' | 'locale' | 'timeZone' | 'architecture' | 'connectionType' | 'pairedAppleWatch' | 'appUptimeInMilliseconds' | 'diskBytesAvailable' | 'diskBytesTotal' | 'batteryPercentage' | 'screenWidthInPoints' | 'screenHeightInPoints' | 'appPlatform' | 'devicePlatform' | 'deviceFamily' | 'buildBundleId' | 'screenshots' | 'build' | 'tester'>,
        include?: Array<'build' | 'tester'>,
    ): CancelablePromise<BetaFeedbackScreenshotSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaFeedbackScreenshotSubmissions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaFeedbackScreenshotSubmissions]': fieldsBetaFeedbackScreenshotSubmissions,
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
    /**
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static betaFeedbackScreenshotSubmissionsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaFeedbackScreenshotSubmissions/{id}',
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
