/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BetaAppLocalizationAppLinkageResponse } from '../models/BetaAppLocalizationAppLinkageResponse';
import type { BetaAppLocalizationCreateRequest } from '../models/BetaAppLocalizationCreateRequest';
import type { BetaAppLocalizationResponse } from '../models/BetaAppLocalizationResponse';
import type { BetaAppLocalizationsResponse } from '../models/BetaAppLocalizationsResponse';
import type { BetaAppLocalizationUpdateRequest } from '../models/BetaAppLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaAppLocalizationsService {
    /**
     * @param filterLocale filter by attribute 'locale'
     * @param filterApp filter by id(s) of related 'app'
     * @param fieldsBetaAppLocalizations the fields to include for returned resources of type betaAppLocalizations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaAppLocalizationsResponse List of BetaAppLocalizations
     * @throws ApiError
     */
    public static betaAppLocalizationsGetCollection(
        filterLocale?: Array<string>,
        filterApp?: Array<string>,
        fieldsBetaAppLocalizations?: Array<'feedbackEmail' | 'marketingUrl' | 'privacyPolicyUrl' | 'tvOsPrivacyPolicy' | 'description' | 'locale' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'app'>,
    ): CancelablePromise<BetaAppLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppLocalizations',
            query: {
                'filter[locale]': filterLocale,
                'filter[app]': filterApp,
                'fields[betaAppLocalizations]': fieldsBetaAppLocalizations,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
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
     * @param requestBody BetaAppLocalization representation
     * @returns BetaAppLocalizationResponse Single BetaAppLocalization
     * @throws ApiError
     */
    public static betaAppLocalizationsCreateInstance(
        requestBody: BetaAppLocalizationCreateRequest,
    ): CancelablePromise<BetaAppLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaAppLocalizations',
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
     * @param fieldsBetaAppLocalizations the fields to include for returned resources of type betaAppLocalizations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @returns BetaAppLocalizationResponse Single BetaAppLocalization
     * @throws ApiError
     */
    public static betaAppLocalizationsGetInstance(
        id: string,
        fieldsBetaAppLocalizations?: Array<'feedbackEmail' | 'marketingUrl' | 'privacyPolicyUrl' | 'tvOsPrivacyPolicy' | 'description' | 'locale' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'app'>,
    ): CancelablePromise<BetaAppLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppLocalizations]': fieldsBetaAppLocalizations,
                'fields[apps]': fieldsApps,
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
     * @param requestBody BetaAppLocalization representation
     * @returns BetaAppLocalizationResponse Single BetaAppLocalization
     * @throws ApiError
     */
    public static betaAppLocalizationsUpdateInstance(
        id: string,
        requestBody: BetaAppLocalizationUpdateRequest,
    ): CancelablePromise<BetaAppLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaAppLocalizations/{id}',
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
    public static betaAppLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaAppLocalizations/{id}',
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
     * @returns BetaAppLocalizationAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaAppLocalizationsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaAppLocalizationAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppLocalizations/{id}/relationships/app',
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
     * @param fieldsApps the fields to include for returned resources of type apps
     * @returns AppWithoutIncludesResponse Single App with get
     * @throws ApiError
     */
    public static betaAppLocalizationsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppLocalizations/{id}/app',
            path: {
                'id': id,
            },
            query: {
                'fields[apps]': fieldsApps,
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
