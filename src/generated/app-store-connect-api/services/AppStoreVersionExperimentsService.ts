/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionExperimentAppStoreVersionExperimentTreatmentsLinkagesResponse } from '../models/AppStoreVersionExperimentAppStoreVersionExperimentTreatmentsLinkagesResponse';
import type { AppStoreVersionExperimentCreateRequest } from '../models/AppStoreVersionExperimentCreateRequest';
import type { AppStoreVersionExperimentResponse } from '../models/AppStoreVersionExperimentResponse';
import type { AppStoreVersionExperimentTreatmentsResponse } from '../models/AppStoreVersionExperimentTreatmentsResponse';
import type { AppStoreVersionExperimentUpdateRequest } from '../models/AppStoreVersionExperimentUpdateRequest';
import type { AppStoreVersionExperimentV2AppStoreVersionExperimentTreatmentsLinkagesResponse } from '../models/AppStoreVersionExperimentV2AppStoreVersionExperimentTreatmentsLinkagesResponse';
import type { AppStoreVersionExperimentV2CreateRequest } from '../models/AppStoreVersionExperimentV2CreateRequest';
import type { AppStoreVersionExperimentV2Response } from '../models/AppStoreVersionExperimentV2Response';
import type { AppStoreVersionExperimentV2UpdateRequest } from '../models/AppStoreVersionExperimentV2UpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionExperimentsService {
    /**
     * @param requestBody AppStoreVersionExperiment representation
     * @returns AppStoreVersionExperimentV2Response Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsV2CreateInstance(
        requestBody: AppStoreVersionExperimentV2CreateRequest,
    ): CancelablePromise<AppStoreVersionExperimentV2Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/appStoreVersionExperiments',
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
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatments maximum number of related appStoreVersionExperimentTreatments returned (when they are included)
     * @param limitControlVersions maximum number of related controlVersions returned (when they are included)
     * @returns AppStoreVersionExperimentV2Response Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsV2GetInstance(
        id: string,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'platform' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'app' | 'latestControlVersion' | 'controlVersions' | 'appStoreVersionExperimentTreatments'>,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        include?: Array<'app' | 'latestControlVersion' | 'controlVersions' | 'appStoreVersionExperimentTreatments'>,
        limitAppStoreVersionExperimentTreatments?: number,
        limitControlVersions?: number,
    ): CancelablePromise<AppStoreVersionExperimentV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appStoreVersionExperiments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'include': include,
                'limit[appStoreVersionExperimentTreatments]': limitAppStoreVersionExperimentTreatments,
                'limit[controlVersions]': limitControlVersions,
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
     * @param requestBody AppStoreVersionExperiment representation
     * @returns AppStoreVersionExperimentV2Response Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsV2UpdateInstance(
        id: string,
        requestBody: AppStoreVersionExperimentV2UpdateRequest,
    ): CancelablePromise<AppStoreVersionExperimentV2Response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v2/appStoreVersionExperiments/{id}',
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
    public static appStoreVersionExperimentsV2DeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/appStoreVersionExperiments/{id}',
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
     * @deprecated
     * @param requestBody AppStoreVersionExperiment representation
     * @returns AppStoreVersionExperimentResponse Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsCreateInstance(
        requestBody: AppStoreVersionExperimentCreateRequest,
    ): CancelablePromise<AppStoreVersionExperimentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionExperiments',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatments maximum number of related appStoreVersionExperimentTreatments returned (when they are included)
     * @returns AppStoreVersionExperimentResponse Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsGetInstance(
        id: string,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments'>,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        include?: Array<'appStoreVersion' | 'appStoreVersionExperimentTreatments'>,
        limitAppStoreVersionExperimentTreatments?: number,
    ): CancelablePromise<AppStoreVersionExperimentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperiments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'include': include,
                'limit[appStoreVersionExperimentTreatments]': limitAppStoreVersionExperimentTreatments,
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
     * @deprecated
     * @param id the id of the requested resource
     * @param requestBody AppStoreVersionExperiment representation
     * @returns AppStoreVersionExperimentResponse Single AppStoreVersionExperiment
     * @throws ApiError
     */
    public static appStoreVersionExperimentsUpdateInstance(
        id: string,
        requestBody: AppStoreVersionExperimentUpdateRequest,
    ): CancelablePromise<AppStoreVersionExperimentResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersionExperiments/{id}',
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
     * @deprecated
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static appStoreVersionExperimentsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreVersionExperiments/{id}',
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
     * @param limit maximum resources per page
     * @returns AppStoreVersionExperimentV2AppStoreVersionExperimentTreatmentsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionExperimentsV2AppStoreVersionExperimentTreatmentsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionExperimentV2AppStoreVersionExperimentTreatmentsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appStoreVersionExperiments/{id}/relationships/appStoreVersionExperimentTreatments',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatmentLocalizations maximum number of related appStoreVersionExperimentTreatmentLocalizations returned (when they are included)
     * @returns AppStoreVersionExperimentTreatmentsResponse List of AppStoreVersionExperimentTreatments
     * @throws ApiError
     */
    public static appStoreVersionExperimentsV2AppStoreVersionExperimentTreatmentsGetToManyRelated(
        id: string,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments' | 'platform' | 'app' | 'latestControlVersion' | 'controlVersions'>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        limit?: number,
        include?: Array<'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        limitAppStoreVersionExperimentTreatmentLocalizations?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appStoreVersionExperiments/{id}/appStoreVersionExperimentTreatments',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'limit': limit,
                'include': include,
                'limit[appStoreVersionExperimentTreatmentLocalizations]': limitAppStoreVersionExperimentTreatmentLocalizations,
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
     * @deprecated
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns AppStoreVersionExperimentAppStoreVersionExperimentTreatmentsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionExperimentsAppStoreVersionExperimentTreatmentsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionExperimentAppStoreVersionExperimentTreatmentsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperiments/{id}/relationships/appStoreVersionExperimentTreatments',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatmentLocalizations maximum number of related appStoreVersionExperimentTreatmentLocalizations returned (when they are included)
     * @returns AppStoreVersionExperimentTreatmentsResponse List of AppStoreVersionExperimentTreatments
     * @throws ApiError
     */
    public static appStoreVersionExperimentsAppStoreVersionExperimentTreatmentsGetToManyRelated(
        id: string,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments' | 'platform' | 'app' | 'latestControlVersion' | 'controlVersions'>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        limit?: number,
        include?: Array<'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        limitAppStoreVersionExperimentTreatmentLocalizations?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperiments/{id}/appStoreVersionExperimentTreatments',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'limit': limit,
                'include': include,
                'limit[appStoreVersionExperimentTreatmentLocalizations]': limitAppStoreVersionExperimentTreatmentLocalizations,
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
