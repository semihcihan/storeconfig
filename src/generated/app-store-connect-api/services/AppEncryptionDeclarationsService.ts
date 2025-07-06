/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEncryptionDeclarationAppEncryptionDeclarationDocumentLinkageResponse } from '../models/AppEncryptionDeclarationAppEncryptionDeclarationDocumentLinkageResponse';
import type { AppEncryptionDeclarationAppLinkageResponse } from '../models/AppEncryptionDeclarationAppLinkageResponse';
import type { AppEncryptionDeclarationBuildsLinkagesRequest } from '../models/AppEncryptionDeclarationBuildsLinkagesRequest';
import type { AppEncryptionDeclarationCreateRequest } from '../models/AppEncryptionDeclarationCreateRequest';
import type { AppEncryptionDeclarationDocumentResponse } from '../models/AppEncryptionDeclarationDocumentResponse';
import type { AppEncryptionDeclarationResponse } from '../models/AppEncryptionDeclarationResponse';
import type { AppEncryptionDeclarationsResponse } from '../models/AppEncryptionDeclarationsResponse';
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEncryptionDeclarationsService {
    /**
     * @param filterPlatform filter by attribute 'platform'
     * @param filterApp filter by id(s) of related 'app'
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAppEncryptionDeclarationDocuments the fields to include for returned resources of type appEncryptionDeclarationDocuments
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns AppEncryptionDeclarationsResponse List of AppEncryptionDeclarations
     * @throws ApiError
     */
    public static appEncryptionDeclarationsGetCollection(
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        filterApp?: Array<string>,
        filterBuilds?: Array<string>,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppEncryptionDeclarationDocuments?: Array<'fileSize' | 'fileName' | 'assetToken' | 'downloadUrl' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState'>,
        limit?: number,
        include?: Array<'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        limitBuilds?: number,
    ): CancelablePromise<AppEncryptionDeclarationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations',
            query: {
                'filter[platform]': filterPlatform,
                'filter[app]': filterApp,
                'filter[builds]': filterBuilds,
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[apps]': fieldsApps,
                'fields[appEncryptionDeclarationDocuments]': fieldsAppEncryptionDeclarationDocuments,
                'limit': limit,
                'include': include,
                'limit[builds]': limitBuilds,
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
     * @param requestBody AppEncryptionDeclaration representation
     * @returns AppEncryptionDeclarationResponse Single AppEncryptionDeclaration
     * @throws ApiError
     */
    public static appEncryptionDeclarationsCreateInstance(
        requestBody: AppEncryptionDeclarationCreateRequest,
    ): CancelablePromise<AppEncryptionDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEncryptionDeclarations',
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
     * @param fieldsAppEncryptionDeclarations the fields to include for returned resources of type appEncryptionDeclarations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsAppEncryptionDeclarationDocuments the fields to include for returned resources of type appEncryptionDeclarationDocuments
     * @param include comma-separated list of relationships to include
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns AppEncryptionDeclarationResponse Single AppEncryptionDeclaration
     * @throws ApiError
     */
    public static appEncryptionDeclarationsGetInstance(
        id: string,
        fieldsAppEncryptionDeclarations?: Array<'appDescription' | 'createdDate' | 'usesEncryption' | 'exempt' | 'containsProprietaryCryptography' | 'containsThirdPartyCryptography' | 'availableOnFrenchStore' | 'platform' | 'uploadedDate' | 'documentUrl' | 'documentName' | 'documentType' | 'appEncryptionDeclarationState' | 'codeValue' | 'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsAppEncryptionDeclarationDocuments?: Array<'fileSize' | 'fileName' | 'assetToken' | 'downloadUrl' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState'>,
        include?: Array<'app' | 'builds' | 'appEncryptionDeclarationDocument'>,
        limitBuilds?: number,
    ): CancelablePromise<AppEncryptionDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEncryptionDeclarations]': fieldsAppEncryptionDeclarations,
                'fields[apps]': fieldsApps,
                'fields[appEncryptionDeclarationDocuments]': fieldsAppEncryptionDeclarationDocuments,
                'include': include,
                'limit[builds]': limitBuilds,
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
     * @returns AppEncryptionDeclarationAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appEncryptionDeclarationsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppEncryptionDeclarationAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations/{id}/relationships/app',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsApps the fields to include for returned resources of type apps
     * @returns AppWithoutIncludesResponse Single App with get
     * @throws ApiError
     */
    public static appEncryptionDeclarationsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations/{id}/app',
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
    /**
     * @param id the id of the requested resource
     * @returns AppEncryptionDeclarationAppEncryptionDeclarationDocumentLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appEncryptionDeclarationsAppEncryptionDeclarationDocumentGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppEncryptionDeclarationAppEncryptionDeclarationDocumentLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations/{id}/relationships/appEncryptionDeclarationDocument',
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
     * @param fieldsAppEncryptionDeclarationDocuments the fields to include for returned resources of type appEncryptionDeclarationDocuments
     * @returns AppEncryptionDeclarationDocumentResponse Single AppEncryptionDeclarationDocument
     * @throws ApiError
     */
    public static appEncryptionDeclarationsAppEncryptionDeclarationDocumentGetToOneRelated(
        id: string,
        fieldsAppEncryptionDeclarationDocuments?: Array<'fileSize' | 'fileName' | 'assetToken' | 'downloadUrl' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<AppEncryptionDeclarationDocumentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEncryptionDeclarations/{id}/appEncryptionDeclarationDocument',
            path: {
                'id': id,
            },
            query: {
                'fields[appEncryptionDeclarationDocuments]': fieldsAppEncryptionDeclarationDocuments,
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
    public static appEncryptionDeclarationsBuildsCreateToManyRelationship(
        id: string,
        requestBody: AppEncryptionDeclarationBuildsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEncryptionDeclarations/{id}/relationships/builds',
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
}
