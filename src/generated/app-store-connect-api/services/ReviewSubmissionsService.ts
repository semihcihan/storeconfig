/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewSubmissionCreateRequest } from '../models/ReviewSubmissionCreateRequest';
import type { ReviewSubmissionItemsLinkagesResponse } from '../models/ReviewSubmissionItemsLinkagesResponse';
import type { ReviewSubmissionItemsResponse } from '../models/ReviewSubmissionItemsResponse';
import type { ReviewSubmissionResponse } from '../models/ReviewSubmissionResponse';
import type { ReviewSubmissionsResponse } from '../models/ReviewSubmissionsResponse';
import type { ReviewSubmissionUpdateRequest } from '../models/ReviewSubmissionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewSubmissionsService {
    /**
     * @param filterApp filter by id(s) of related 'app'
     * @param filterPlatform filter by attribute 'platform'
     * @param filterState filter by attribute 'state'
     * @param fieldsReviewSubmissions the fields to include for returned resources of type reviewSubmissions
     * @param fieldsReviewSubmissionItems the fields to include for returned resources of type reviewSubmissionItems
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitItems maximum number of related items returned (when they are included)
     * @returns ReviewSubmissionsResponse List of ReviewSubmissions
     * @throws ApiError
     */
    public static reviewSubmissionsGetCollection(
        filterApp: Array<string>,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterState?: Array<'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'UNRESOLVED_ISSUES' | 'CANCELING' | 'COMPLETING' | 'COMPLETE'>,
        fieldsReviewSubmissions?: Array<'platform' | 'submittedDate' | 'state' | 'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        fieldsReviewSubmissionItems?: Array<'state' | 'appStoreVersion' | 'appCustomProductPageVersion' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appEvent'>,
        limit?: number,
        include?: Array<'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        limitItems?: number,
    ): CancelablePromise<ReviewSubmissionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviewSubmissions',
            query: {
                'filter[platform]': filterPlatform,
                'filter[state]': filterState,
                'filter[app]': filterApp,
                'fields[reviewSubmissions]': fieldsReviewSubmissions,
                'fields[reviewSubmissionItems]': fieldsReviewSubmissionItems,
                'limit': limit,
                'include': include,
                'limit[items]': limitItems,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param requestBody ReviewSubmission representation
     * @returns ReviewSubmissionResponse Single ReviewSubmission
     * @throws ApiError
     */
    public static reviewSubmissionsCreateInstance(
        requestBody: ReviewSubmissionCreateRequest,
    ): CancelablePromise<ReviewSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reviewSubmissions',
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
     * @param fieldsReviewSubmissions the fields to include for returned resources of type reviewSubmissions
     * @param fieldsReviewSubmissionItems the fields to include for returned resources of type reviewSubmissionItems
     * @param include comma-separated list of relationships to include
     * @param limitItems maximum number of related items returned (when they are included)
     * @returns ReviewSubmissionResponse Single ReviewSubmission
     * @throws ApiError
     */
    public static reviewSubmissionsGetInstance(
        id: string,
        fieldsReviewSubmissions?: Array<'platform' | 'submittedDate' | 'state' | 'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        fieldsReviewSubmissionItems?: Array<'state' | 'appStoreVersion' | 'appCustomProductPageVersion' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appEvent'>,
        include?: Array<'app' | 'items' | 'appStoreVersionForReview' | 'submittedByActor' | 'lastUpdatedByActor'>,
        limitItems?: number,
    ): CancelablePromise<ReviewSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviewSubmissions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[reviewSubmissions]': fieldsReviewSubmissions,
                'fields[reviewSubmissionItems]': fieldsReviewSubmissionItems,
                'include': include,
                'limit[items]': limitItems,
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
     * @param requestBody ReviewSubmission representation
     * @returns ReviewSubmissionResponse Single ReviewSubmission
     * @throws ApiError
     */
    public static reviewSubmissionsUpdateInstance(
        id: string,
        requestBody: ReviewSubmissionUpdateRequest,
    ): CancelablePromise<ReviewSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/reviewSubmissions/{id}',
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
     * @param limit maximum resources per page
     * @returns ReviewSubmissionItemsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static reviewSubmissionsItemsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ReviewSubmissionItemsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviewSubmissions/{id}/relationships/items',
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
     * @param fieldsReviewSubmissionItems the fields to include for returned resources of type reviewSubmissionItems
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param fieldsAppStoreVersionExperiments the fields to include for returned resources of type appStoreVersionExperiments
     * @param fieldsAppEvents the fields to include for returned resources of type appEvents
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns ReviewSubmissionItemsResponse List of ReviewSubmissionItems
     * @throws ApiError
     */
    public static reviewSubmissionsItemsGetToManyRelated(
        id: string,
        fieldsReviewSubmissionItems?: Array<'state' | 'appStoreVersion' | 'appCustomProductPageVersion' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appEvent'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        fieldsAppStoreVersionExperiments?: Array<'name' | 'trafficProportion' | 'state' | 'reviewRequired' | 'startDate' | 'endDate' | 'appStoreVersion' | 'appStoreVersionExperimentTreatments' | 'platform' | 'app' | 'latestControlVersion' | 'controlVersions'>,
        fieldsAppEvents?: Array<'referenceName' | 'badge' | 'eventState' | 'deepLink' | 'purchaseRequirement' | 'primaryLocale' | 'priority' | 'purpose' | 'territorySchedules' | 'archivedTerritorySchedules' | 'localizations'>,
        limit?: number,
        include?: Array<'appStoreVersion' | 'appCustomProductPageVersion' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appEvent'>,
    ): CancelablePromise<ReviewSubmissionItemsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviewSubmissions/{id}/items',
            path: {
                'id': id,
            },
            query: {
                'fields[reviewSubmissionItems]': fieldsReviewSubmissionItems,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'fields[appStoreVersionExperiments]': fieldsAppStoreVersionExperiments,
                'fields[appEvents]': fieldsAppEvents,
                'limit': limit,
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
