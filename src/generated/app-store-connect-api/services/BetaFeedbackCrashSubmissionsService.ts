/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaCrashLogResponse } from '../models/BetaCrashLogResponse';
import type { BetaFeedbackCrashSubmissionCrashLogLinkageResponse } from '../models/BetaFeedbackCrashSubmissionCrashLogLinkageResponse';
import type { BetaFeedbackCrashSubmissionResponse } from '../models/BetaFeedbackCrashSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaFeedbackCrashSubmissionsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsBetaFeedbackCrashSubmissions the fields to include for returned resources of type betaFeedbackCrashSubmissions
     * @param include comma-separated list of relationships to include
     * @returns BetaFeedbackCrashSubmissionResponse Single BetaFeedbackCrashSubmission
     * @throws ApiError
     */
    public static betaFeedbackCrashSubmissionsGetInstance(
        id: string,
        fieldsBetaFeedbackCrashSubmissions?: Array<'createdDate' | 'comment' | 'email' | 'deviceModel' | 'osVersion' | 'locale' | 'timeZone' | 'architecture' | 'connectionType' | 'pairedAppleWatch' | 'appUptimeInMilliseconds' | 'diskBytesAvailable' | 'diskBytesTotal' | 'batteryPercentage' | 'screenWidthInPoints' | 'screenHeightInPoints' | 'appPlatform' | 'devicePlatform' | 'deviceFamily' | 'buildBundleId' | 'crashLog' | 'build' | 'tester'>,
        include?: Array<'build' | 'tester'>,
    ): CancelablePromise<BetaFeedbackCrashSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaFeedbackCrashSubmissions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaFeedbackCrashSubmissions]': fieldsBetaFeedbackCrashSubmissions,
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
    public static betaFeedbackCrashSubmissionsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaFeedbackCrashSubmissions/{id}',
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
    /**
     * @param id the id of the requested resource
     * @returns BetaFeedbackCrashSubmissionCrashLogLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaFeedbackCrashSubmissionsCrashLogGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaFeedbackCrashSubmissionCrashLogLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaFeedbackCrashSubmissions/{id}/relationships/crashLog',
            path: {
                'id': id,
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
     * @param fieldsBetaCrashLogs the fields to include for returned resources of type betaCrashLogs
     * @returns BetaCrashLogResponse Single BetaCrashLog
     * @throws ApiError
     */
    public static betaFeedbackCrashSubmissionsCrashLogGetToOneRelated(
        id: string,
        fieldsBetaCrashLogs?: Array<'logText'>,
    ): CancelablePromise<BetaCrashLogResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaFeedbackCrashSubmissions/{id}/crashLog',
            path: {
                'id': id,
            },
            query: {
                'fields[betaCrashLogs]': fieldsBetaCrashLogs,
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
