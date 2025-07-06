/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppsWithoutIncludesResponse } from '../models/AppsWithoutIncludesResponse';
import type { UserResponse } from '../models/UserResponse';
import type { UsersResponse } from '../models/UsersResponse';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
import type { UserVisibleAppsLinkagesRequest } from '../models/UserVisibleAppsLinkagesRequest';
import type { UserVisibleAppsLinkagesResponse } from '../models/UserVisibleAppsLinkagesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param filterUsername filter by attribute 'username'
     * @param filterRoles filter by attribute 'roles'
     * @param filterVisibleApps filter by id(s) of related 'visibleApps'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsUsers the fields to include for returned resources of type users
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitVisibleApps maximum number of related visibleApps returned (when they are included)
     * @returns UsersResponse List of Users
     * @throws ApiError
     */
    public static usersGetCollection(
        filterUsername?: Array<string>,
        filterRoles?: Array<'ADMIN' | 'FINANCE' | 'ACCOUNT_HOLDER' | 'SALES' | 'MARKETING' | 'APP_MANAGER' | 'DEVELOPER' | 'ACCESS_TO_REPORTS' | 'CUSTOMER_SUPPORT' | 'CREATE_APPS' | 'CLOUD_MANAGED_DEVELOPER_ID' | 'CLOUD_MANAGED_APP_DISTRIBUTION' | 'GENERATE_INDIVIDUAL_KEYS'>,
        filterVisibleApps?: Array<string>,
        sort?: Array<'username' | '-username' | 'lastName' | '-lastName'>,
        fieldsUsers?: Array<'username' | 'firstName' | 'lastName' | 'roles' | 'allAppsVisible' | 'provisioningAllowed' | 'visibleApps'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'visibleApps'>,
        limitVisibleApps?: number,
    ): CancelablePromise<UsersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users',
            query: {
                'filter[username]': filterUsername,
                'filter[roles]': filterRoles,
                'filter[visibleApps]': filterVisibleApps,
                'sort': sort,
                'fields[users]': fieldsUsers,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[visibleApps]': limitVisibleApps,
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
     * @param fieldsUsers the fields to include for returned resources of type users
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @param limitVisibleApps maximum number of related visibleApps returned (when they are included)
     * @returns UserResponse Single User
     * @throws ApiError
     */
    public static usersGetInstance(
        id: string,
        fieldsUsers?: Array<'username' | 'firstName' | 'lastName' | 'roles' | 'allAppsVisible' | 'provisioningAllowed' | 'visibleApps'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'visibleApps'>,
        limitVisibleApps?: number,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[users]': fieldsUsers,
                'fields[apps]': fieldsApps,
                'include': include,
                'limit[visibleApps]': limitVisibleApps,
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
     * @param requestBody User representation
     * @returns UserResponse Single User
     * @throws ApiError
     */
    public static usersUpdateInstance(
        id: string,
        requestBody: UserUpdateRequest,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/users/{id}',
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
    public static usersDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}',
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
     * @returns UserVisibleAppsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static usersVisibleAppsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<UserVisibleAppsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}/relationships/visibleApps',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static usersVisibleAppsCreateToManyRelationship(
        id: string,
        requestBody: UserVisibleAppsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/{id}/relationships/visibleApps',
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
     * @param id the id of the requested resource
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static usersVisibleAppsReplaceToManyRelationship(
        id: string,
        requestBody: UserVisibleAppsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/users/{id}/relationships/visibleApps',
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
     * @param id the id of the requested resource
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static usersVisibleAppsDeleteToManyRelationship(
        id: string,
        requestBody: UserVisibleAppsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}/relationships/visibleApps',
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
     * @param id the id of the requested resource
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @returns AppsWithoutIncludesResponse List of Apps with get
     * @throws ApiError
     */
    public static usersVisibleAppsGetToManyRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
    ): CancelablePromise<AppsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}/visibleApps',
            path: {
                'id': id,
            },
            query: {
                'fields[apps]': fieldsApps,
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
}
