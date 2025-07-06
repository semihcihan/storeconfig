/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BundleIdAppLinkageResponse } from '../models/BundleIdAppLinkageResponse';
import type { BundleIdBundleIdCapabilitiesLinkagesResponse } from '../models/BundleIdBundleIdCapabilitiesLinkagesResponse';
import type { BundleIdCapabilitiesWithoutIncludesResponse } from '../models/BundleIdCapabilitiesWithoutIncludesResponse';
import type { BundleIdCreateRequest } from '../models/BundleIdCreateRequest';
import type { BundleIdProfilesLinkagesResponse } from '../models/BundleIdProfilesLinkagesResponse';
import type { BundleIdResponse } from '../models/BundleIdResponse';
import type { BundleIdsResponse } from '../models/BundleIdsResponse';
import type { BundleIdUpdateRequest } from '../models/BundleIdUpdateRequest';
import type { ProfilesWithoutIncludesResponse } from '../models/ProfilesWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BundleIdsService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterPlatform filter by attribute 'platform'
     * @param filterIdentifier filter by attribute 'identifier'
     * @param filterSeedId filter by attribute 'seedId'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @param fieldsProfiles the fields to include for returned resources of type profiles
     * @param fieldsBundleIdCapabilities the fields to include for returned resources of type bundleIdCapabilities
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBundleIdCapabilities maximum number of related bundleIdCapabilities returned (when they are included)
     * @param limitProfiles maximum number of related profiles returned (when they are included)
     * @returns BundleIdsResponse List of BundleIds
     * @throws ApiError
     */
    public static bundleIdsGetCollection(
        filterName?: Array<string>,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'UNIVERSAL'>,
        filterIdentifier?: Array<string>,
        filterSeedId?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'name' | '-name' | 'platform' | '-platform' | 'identifier' | '-identifier' | 'seedId' | '-seedId' | 'id' | '-id'>,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
        fieldsProfiles?: Array<'name' | 'platform' | 'profileType' | 'profileState' | 'profileContent' | 'uuid' | 'createdDate' | 'expirationDate' | 'bundleId' | 'devices' | 'certificates'>,
        fieldsBundleIdCapabilities?: Array<'capabilityType' | 'settings'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
        include?: Array<'profiles' | 'bundleIdCapabilities' | 'app'>,
        limitBundleIdCapabilities?: number,
        limitProfiles?: number,
    ): CancelablePromise<BundleIdsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds',
            query: {
                'filter[name]': filterName,
                'filter[platform]': filterPlatform,
                'filter[identifier]': filterIdentifier,
                'filter[seedId]': filterSeedId,
                'filter[id]': filterId,
                'sort': sort,
                'fields[bundleIds]': fieldsBundleIds,
                'fields[profiles]': fieldsProfiles,
                'fields[bundleIdCapabilities]': fieldsBundleIdCapabilities,
                'fields[apps]': fieldsApps,
                'limit': limit,
                'include': include,
                'limit[bundleIdCapabilities]': limitBundleIdCapabilities,
                'limit[profiles]': limitProfiles,
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
     * @param requestBody BundleId representation
     * @returns BundleIdResponse Single BundleId
     * @throws ApiError
     */
    public static bundleIdsCreateInstance(
        requestBody: BundleIdCreateRequest,
    ): CancelablePromise<BundleIdResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/bundleIds',
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
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @param fieldsProfiles the fields to include for returned resources of type profiles
     * @param fieldsBundleIdCapabilities the fields to include for returned resources of type bundleIdCapabilities
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param include comma-separated list of relationships to include
     * @param limitBundleIdCapabilities maximum number of related bundleIdCapabilities returned (when they are included)
     * @param limitProfiles maximum number of related profiles returned (when they are included)
     * @returns BundleIdResponse Single BundleId
     * @throws ApiError
     */
    public static bundleIdsGetInstance(
        id: string,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
        fieldsProfiles?: Array<'name' | 'platform' | 'profileType' | 'profileState' | 'profileContent' | 'uuid' | 'createdDate' | 'expirationDate' | 'bundleId' | 'devices' | 'certificates'>,
        fieldsBundleIdCapabilities?: Array<'capabilityType' | 'settings'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        include?: Array<'profiles' | 'bundleIdCapabilities' | 'app'>,
        limitBundleIdCapabilities?: number,
        limitProfiles?: number,
    ): CancelablePromise<BundleIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[bundleIds]': fieldsBundleIds,
                'fields[profiles]': fieldsProfiles,
                'fields[bundleIdCapabilities]': fieldsBundleIdCapabilities,
                'fields[apps]': fieldsApps,
                'include': include,
                'limit[bundleIdCapabilities]': limitBundleIdCapabilities,
                'limit[profiles]': limitProfiles,
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
     * @param requestBody BundleId representation
     * @returns BundleIdResponse Single BundleId
     * @throws ApiError
     */
    public static bundleIdsUpdateInstance(
        id: string,
        requestBody: BundleIdUpdateRequest,
    ): CancelablePromise<BundleIdResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/bundleIds/{id}',
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
    public static bundleIdsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/bundleIds/{id}',
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
     * @returns BundleIdAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static bundleIdsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<BundleIdAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/relationships/app',
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
    public static bundleIdsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/app',
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
     * @param limit maximum resources per page
     * @returns BundleIdBundleIdCapabilitiesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static bundleIdsBundleIdCapabilitiesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BundleIdBundleIdCapabilitiesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/relationships/bundleIdCapabilities',
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
     * @param fieldsBundleIdCapabilities the fields to include for returned resources of type bundleIdCapabilities
     * @param limit maximum resources per page
     * @returns BundleIdCapabilitiesWithoutIncludesResponse List of BundleIdCapabilities with get
     * @throws ApiError
     */
    public static bundleIdsBundleIdCapabilitiesGetToManyRelated(
        id: string,
        fieldsBundleIdCapabilities?: Array<'capabilityType' | 'settings'>,
        limit?: number,
    ): CancelablePromise<BundleIdCapabilitiesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/bundleIdCapabilities',
            path: {
                'id': id,
            },
            query: {
                'fields[bundleIdCapabilities]': fieldsBundleIdCapabilities,
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
     * @param limit maximum resources per page
     * @returns BundleIdProfilesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static bundleIdsProfilesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BundleIdProfilesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/relationships/profiles',
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
     * @param fieldsProfiles the fields to include for returned resources of type profiles
     * @param limit maximum resources per page
     * @returns ProfilesWithoutIncludesResponse List of Profiles with get
     * @throws ApiError
     */
    public static bundleIdsProfilesGetToManyRelated(
        id: string,
        fieldsProfiles?: Array<'name' | 'platform' | 'profileType' | 'profileState' | 'profileContent' | 'uuid' | 'createdDate' | 'expirationDate' | 'bundleId' | 'devices' | 'certificates'>,
        limit?: number,
    ): CancelablePromise<ProfilesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/bundleIds/{id}/profiles',
            path: {
                'id': id,
            },
            query: {
                'fields[profiles]': fieldsProfiles,
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
