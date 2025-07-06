/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppsWithoutIncludesResponse } from '../models/AppsWithoutIncludesResponse';
import type { BetaGroupsWithoutIncludesResponse } from '../models/BetaGroupsWithoutIncludesResponse';
import type { BetaTesterAppsLinkagesRequest } from '../models/BetaTesterAppsLinkagesRequest';
import type { BetaTesterAppsLinkagesResponse } from '../models/BetaTesterAppsLinkagesResponse';
import type { BetaTesterBetaGroupsLinkagesRequest } from '../models/BetaTesterBetaGroupsLinkagesRequest';
import type { BetaTesterBetaGroupsLinkagesResponse } from '../models/BetaTesterBetaGroupsLinkagesResponse';
import type { BetaTesterBuildsLinkagesRequest } from '../models/BetaTesterBuildsLinkagesRequest';
import type { BetaTesterBuildsLinkagesResponse } from '../models/BetaTesterBuildsLinkagesResponse';
import type { BetaTesterCreateRequest } from '../models/BetaTesterCreateRequest';
import type { BetaTesterResponse } from '../models/BetaTesterResponse';
import type { BetaTestersResponse } from '../models/BetaTestersResponse';
import type { BetaTesterUsagesV1MetricResponse } from '../models/BetaTesterUsagesV1MetricResponse';
import type { BuildsWithoutIncludesResponse } from '../models/BuildsWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaTestersService {
    /**
     * @param filterFirstName filter by attribute 'firstName'
     * @param filterLastName filter by attribute 'lastName'
     * @param filterEmail filter by attribute 'email'
     * @param filterInviteType filter by attribute 'inviteType'
     * @param filterApps filter by id(s) of related 'apps'
     * @param filterBetaGroups filter by id(s) of related 'betaGroups'
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitApps maximum number of related apps returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns BetaTestersResponse List of BetaTesters
     * @throws ApiError
     */
    public static betaTestersGetCollection(
        filterFirstName?: Array<string>,
        filterLastName?: Array<string>,
        filterEmail?: Array<string>,
        filterInviteType?: Array<'EMAIL' | 'PUBLIC_LINK'>,
        filterApps?: Array<string>,
        filterBetaGroups?: Array<string>,
        filterBuilds?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'firstName' | '-firstName' | 'lastName' | '-lastName' | 'email' | '-email' | 'inviteType' | '-inviteType' | 'state' | '-state'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
        include?: Array<'apps' | 'betaGroups' | 'builds'>,
        limitApps?: number,
        limitBetaGroups?: number,
        limitBuilds?: number,
    ): CancelablePromise<BetaTestersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters',
            query: {
                'filter[firstName]': filterFirstName,
                'filter[lastName]': filterLastName,
                'filter[email]': filterEmail,
                'filter[inviteType]': filterInviteType,
                'filter[apps]': filterApps,
                'filter[betaGroups]': filterBetaGroups,
                'filter[builds]': filterBuilds,
                'filter[id]': filterId,
                'sort': sort,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[apps]': fieldsApps,
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[builds]': fieldsBuilds,
                'limit': limit,
                'include': include,
                'limit[apps]': limitApps,
                'limit[betaGroups]': limitBetaGroups,
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
     * @param requestBody BetaTester representation
     * @returns BetaTesterResponse Single BetaTester
     * @throws ApiError
     */
    public static betaTestersCreateInstance(
        requestBody: BetaTesterCreateRequest,
    ): CancelablePromise<BetaTesterResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaTesters',
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
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param include comma-separated list of relationships to include
     * @param limitApps maximum number of related apps returned (when they are included)
     * @param limitBetaGroups maximum number of related betaGroups returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns BetaTesterResponse Single BetaTester
     * @throws ApiError
     */
    public static betaTestersGetInstance(
        id: string,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        include?: Array<'apps' | 'betaGroups' | 'builds'>,
        limitApps?: number,
        limitBetaGroups?: number,
        limitBuilds?: number,
    ): CancelablePromise<BetaTesterResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[apps]': fieldsApps,
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[builds]': fieldsBuilds,
                'include': include,
                'limit[apps]': limitApps,
                'limit[betaGroups]': limitBetaGroups,
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
     * @param id the id of the requested resource
     * @returns any Accepted for future completion
     * @throws ApiError
     */
    public static betaTestersDeleteInstance(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaTesters/{id}',
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
     * @returns BetaTesterAppsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static betaTestersAppsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaTesterAppsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/relationships/apps',
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
     * @returns any Accepted for future completion
     * @throws ApiError
     */
    public static betaTestersAppsDeleteToManyRelationship(
        id: string,
        requestBody: BetaTesterAppsLinkagesRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaTesters/{id}/relationships/apps',
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
    public static betaTestersAppsGetToManyRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        limit?: number,
    ): CancelablePromise<AppsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/apps',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns BetaTesterBetaGroupsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static betaTestersBetaGroupsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaTesterBetaGroupsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/relationships/betaGroups',
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
    public static betaTestersBetaGroupsCreateToManyRelationship(
        id: string,
        requestBody: BetaTesterBetaGroupsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaTesters/{id}/relationships/betaGroups',
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
    public static betaTestersBetaGroupsDeleteToManyRelationship(
        id: string,
        requestBody: BetaTesterBetaGroupsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaTesters/{id}/relationships/betaGroups',
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
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param limit maximum resources per page
     * @returns BetaGroupsWithoutIncludesResponse List of BetaGroups with get
     * @throws ApiError
     */
    public static betaTestersBetaGroupsGetToManyRelated(
        id: string,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        limit?: number,
    ): CancelablePromise<BetaGroupsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/betaGroups',
            path: {
                'id': id,
            },
            query: {
                'fields[betaGroups]': fieldsBetaGroups,
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
     * @returns BetaTesterBuildsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static betaTestersBuildsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaTesterBuildsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/relationships/builds',
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
    public static betaTestersBuildsCreateToManyRelationship(
        id: string,
        requestBody: BetaTesterBuildsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaTesters/{id}/relationships/builds',
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
    public static betaTestersBuildsDeleteToManyRelationship(
        id: string,
        requestBody: BetaTesterBuildsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaTesters/{id}/relationships/builds',
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
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param limit maximum resources per page
     * @returns BuildsWithoutIncludesResponse List of Builds with get
     * @throws ApiError
     */
    public static betaTestersBuildsGetToManyRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
    ): CancelablePromise<BuildsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/builds',
            path: {
                'id': id,
            },
            query: {
                'fields[builds]': fieldsBuilds,
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
     * @param filterApps filter by 'apps' relationship dimension
     * @param period the duration of the reporting period
     * @param limit maximum number of groups to return per page
     * @returns BetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaTestersBetaTesterUsagesGetMetrics(
        id: string,
        filterApps: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        limit?: number,
    ): CancelablePromise<BetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'filter[apps]': filterApps,
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
