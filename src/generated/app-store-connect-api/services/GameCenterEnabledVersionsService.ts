/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterEnabledVersionCompatibleVersionsLinkagesRequest } from '../models/GameCenterEnabledVersionCompatibleVersionsLinkagesRequest';
import type { GameCenterEnabledVersionCompatibleVersionsLinkagesResponse } from '../models/GameCenterEnabledVersionCompatibleVersionsLinkagesResponse';
import type { GameCenterEnabledVersionsResponse } from '../models/GameCenterEnabledVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterEnabledVersionsService {
    /**
     * @deprecated
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterEnabledVersionCompatibleVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterEnabledVersionsCompatibleVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterEnabledVersionCompatibleVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterEnabledVersions/{id}/relationships/compatibleVersions',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterEnabledVersionsCompatibleVersionsCreateToManyRelationship(
        id: string,
        requestBody: GameCenterEnabledVersionCompatibleVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterEnabledVersions/{id}/relationships/compatibleVersions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterEnabledVersionsCompatibleVersionsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterEnabledVersionCompatibleVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterEnabledVersions/{id}/relationships/compatibleVersions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterEnabledVersionsCompatibleVersionsDeleteToManyRelationship(
        id: string,
        requestBody: GameCenterEnabledVersionCompatibleVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterEnabledVersions/{id}/relationships/compatibleVersions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param filterPlatform filter by attribute 'platform'
     * @param filterVersionString filter by attribute 'versionString'
     * @param filterApp filter by id(s) of related 'app'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsGameCenterEnabledVersions the fields to include for returned resources of type gameCenterEnabledVersions
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCompatibleVersions maximum number of related compatibleVersions returned (when they are included)
     * @returns GameCenterEnabledVersionsResponse List of GameCenterEnabledVersions
     * @throws ApiError
     */
    public static gameCenterEnabledVersionsCompatibleVersionsGetToManyRelated(
        id: string,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterVersionString?: Array<string>,
        filterApp?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'versionString' | '-versionString'>,
        fieldsGameCenterEnabledVersions?: Array<'platform' | 'versionString' | 'iconAsset' | 'compatibleVersions' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'compatibleVersions' | 'app'>,
        limitCompatibleVersions?: number,
    ): CancelablePromise<GameCenterEnabledVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterEnabledVersions/{id}/compatibleVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[platform]': filterPlatform,
                'filter[versionString]': filterVersionString,
                'filter[app]': filterApp,
                'filter[id]': filterId,
                'sort': sort,
                'fields[gameCenterEnabledVersions]': fieldsGameCenterEnabledVersions,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[compatibleVersions]': limitCompatibleVersions,
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
