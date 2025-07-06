/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppsWithoutIncludesResponse } from '../models/AppsWithoutIncludesResponse';
import type { UserInvitationCreateRequest } from '../models/UserInvitationCreateRequest';
import type { UserInvitationResponse } from '../models/UserInvitationResponse';
import type { UserInvitationsResponse } from '../models/UserInvitationsResponse';
import type { UserInvitationVisibleAppsLinkagesResponse } from '../models/UserInvitationVisibleAppsLinkagesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserInvitationsService {
    /**
     * @param filterEmail filter by attribute 'email'
     * @param filterRoles filter by attribute 'roles'
     * @param filterVisibleApps filter by id(s) of related 'visibleApps'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsUserInvitations the fields to include for returned resources of type userInvitations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitVisibleApps maximum number of related visibleApps returned (when they are included)
     * @returns UserInvitationsResponse List of UserInvitations
     * @throws ApiError
     */
    public static userInvitationsGetCollection(
        filterEmail?: Array<string>,
        filterRoles?: Array<'ADMIN' | 'FINANCE' | 'ACCOUNT_HOLDER' | 'SALES' | 'MARKETING' | 'APP_MANAGER' | 'DEVELOPER' | 'ACCESS_TO_REPORTS' | 'CUSTOMER_SUPPORT' | 'CREATE_APPS' | 'CLOUD_MANAGED_DEVELOPER_ID' | 'CLOUD_MANAGED_APP_DISTRIBUTION' | 'GENERATE_INDIVIDUAL_KEYS'>,
        filterVisibleApps?: Array<string>,
        sort?: Array<'email' | '-email' | 'lastName' | '-lastName'>,
        fieldsUserInvitations?: Array<'email' | 'firstName' | 'lastName' | 'expirationDate' | 'roles' | 'allAppsVisible' | 'provisioningAllowed' | 'visibleApps'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'visibleApps'>,
        limitVisibleApps?: number,
    ): CancelablePromise<UserInvitationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/userInvitations',
            query: {
                'filter[email]': filterEmail,
                'filter[roles]': filterRoles,
                'filter[visibleApps]': filterVisibleApps,
                'sort': sort,
                'fields[userInvitations]': fieldsUserInvitations,
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
     * @param requestBody UserInvitation representation
     * @returns UserInvitationResponse Single UserInvitation
     * @throws ApiError
     */
    public static userInvitationsCreateInstance(
        requestBody: UserInvitationCreateRequest,
    ): CancelablePromise<UserInvitationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/userInvitations',
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
     * @param fieldsUserInvitations the fields to include for returned resources of type userInvitations
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @param limitVisibleApps maximum number of related visibleApps returned (when they are included)
     * @returns UserInvitationResponse Single UserInvitation
     * @throws ApiError
     */
    public static userInvitationsGetInstance(
        id: string,
        fieldsUserInvitations?: Array<'email' | 'firstName' | 'lastName' | 'expirationDate' | 'roles' | 'allAppsVisible' | 'provisioningAllowed' | 'visibleApps'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'visibleApps'>,
        limitVisibleApps?: number,
    ): CancelablePromise<UserInvitationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/userInvitations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[userInvitations]': fieldsUserInvitations,
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
     * @returns void
     * @throws ApiError
     */
    public static userInvitationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/userInvitations/{id}',
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
     * @returns UserInvitationVisibleAppsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static userInvitationsVisibleAppsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<UserInvitationVisibleAppsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/userInvitations/{id}/relationships/visibleApps',
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
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @returns AppsWithoutIncludesResponse List of Apps with get
     * @throws ApiError
     */
    public static userInvitationsVisibleAppsGetToManyRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
    ): CancelablePromise<AppsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/userInvitations/{id}/visibleApps',
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
