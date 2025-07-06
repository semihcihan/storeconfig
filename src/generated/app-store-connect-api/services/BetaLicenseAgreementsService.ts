/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BetaLicenseAgreementAppLinkageResponse } from '../models/BetaLicenseAgreementAppLinkageResponse';
import type { BetaLicenseAgreementResponse } from '../models/BetaLicenseAgreementResponse';
import type { BetaLicenseAgreementsResponse } from '../models/BetaLicenseAgreementsResponse';
import type { BetaLicenseAgreementUpdateRequest } from '../models/BetaLicenseAgreementUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaLicenseAgreementsService {
    /**
     * @param filterApp filter by id(s) of related 'app'
     * @param fieldsBetaLicenseAgreements the fields to include for returned resources of type betaLicenseAgreements
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BetaLicenseAgreementsResponse List of BetaLicenseAgreements
     * @throws ApiError
     */
    public static betaLicenseAgreementsGetCollection(
        filterApp?: Array<string>,
        fieldsBetaLicenseAgreements?: Array<'agreementText' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'app'>,
    ): CancelablePromise<BetaLicenseAgreementsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaLicenseAgreements',
            query: {
                'filter[app]': filterApp,
                'fields[betaLicenseAgreements]': fieldsBetaLicenseAgreements,
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
     * @param id the id of the requested resource
     * @param fieldsBetaLicenseAgreements the fields to include for returned resources of type betaLicenseAgreements
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @returns BetaLicenseAgreementResponse Single BetaLicenseAgreement
     * @throws ApiError
     */
    public static betaLicenseAgreementsGetInstance(
        id: string,
        fieldsBetaLicenseAgreements?: Array<'agreementText' | 'app'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'app'>,
    ): CancelablePromise<BetaLicenseAgreementResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaLicenseAgreements/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaLicenseAgreements]': fieldsBetaLicenseAgreements,
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
     * @param requestBody BetaLicenseAgreement representation
     * @returns BetaLicenseAgreementResponse Single BetaLicenseAgreement
     * @throws ApiError
     */
    public static betaLicenseAgreementsUpdateInstance(
        id: string,
        requestBody: BetaLicenseAgreementUpdateRequest,
    ): CancelablePromise<BetaLicenseAgreementResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaLicenseAgreements/{id}',
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
     * @returns BetaLicenseAgreementAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaLicenseAgreementsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaLicenseAgreementAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaLicenseAgreements/{id}/relationships/app',
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
    public static betaLicenseAgreementsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaLicenseAgreements/{id}/app',
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
