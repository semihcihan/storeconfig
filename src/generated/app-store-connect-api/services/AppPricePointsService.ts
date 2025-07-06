/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPricePointsV3Response } from '../models/AppPricePointsV3Response';
import type { AppPricePointV3EqualizationsLinkagesResponse } from '../models/AppPricePointV3EqualizationsLinkagesResponse';
import type { AppPricePointV3Response } from '../models/AppPricePointV3Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppPricePointsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAppPricePoints the fields to include for returned resources of type appPricePoints
     * @param include comma-separated list of relationships to include
     * @returns AppPricePointV3Response Single AppPricePoint
     * @throws ApiError
     */
    public static appPricePointsV3GetInstance(
        id: string,
        fieldsAppPricePoints?: Array<'customerPrice' | 'proceeds' | 'app' | 'equalizations' | 'territory'>,
        include?: Array<'app' | 'territory'>,
    ): CancelablePromise<AppPricePointV3Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v3/appPricePoints/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appPricePoints]': fieldsAppPricePoints,
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
     * @param limit maximum resources per page
     * @returns AppPricePointV3EqualizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appPricePointsV3EqualizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPricePointV3EqualizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v3/appPricePoints/{id}/relationships/equalizations',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsAppPricePoints the fields to include for returned resources of type appPricePoints
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppPricePointsV3Response List of AppPricePoints
     * @throws ApiError
     */
    public static appPricePointsV3EqualizationsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsAppPricePoints?: Array<'customerPrice' | 'proceeds' | 'app' | 'equalizations' | 'territory'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'app' | 'territory'>,
    ): CancelablePromise<AppPricePointsV3Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v3/appPricePoints/{id}/equalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[appPricePoints]': fieldsAppPricePoints,
                'fields[apps]': fieldsApps,
                'fields[territories]': fieldsTerritories,
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
