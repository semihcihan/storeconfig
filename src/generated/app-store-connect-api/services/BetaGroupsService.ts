/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppsBetaTesterUsagesV1MetricResponse } from '../models/AppsBetaTesterUsagesV1MetricResponse';
import type { AppWithoutIncludesResponse } from '../models/AppWithoutIncludesResponse';
import type { BetaGroupAppLinkageResponse } from '../models/BetaGroupAppLinkageResponse';
import type { BetaGroupBetaRecruitmentCriteriaLinkageResponse } from '../models/BetaGroupBetaRecruitmentCriteriaLinkageResponse';
import type { BetaGroupBetaRecruitmentCriterionCompatibleBuildCheckLinkageResponse } from '../models/BetaGroupBetaRecruitmentCriterionCompatibleBuildCheckLinkageResponse';
import type { BetaGroupBetaTestersLinkagesRequest } from '../models/BetaGroupBetaTestersLinkagesRequest';
import type { BetaGroupBetaTestersLinkagesResponse } from '../models/BetaGroupBetaTestersLinkagesResponse';
import type { BetaGroupBuildsLinkagesRequest } from '../models/BetaGroupBuildsLinkagesRequest';
import type { BetaGroupBuildsLinkagesResponse } from '../models/BetaGroupBuildsLinkagesResponse';
import type { BetaGroupCreateRequest } from '../models/BetaGroupCreateRequest';
import type { BetaGroupResponse } from '../models/BetaGroupResponse';
import type { BetaGroupsResponse } from '../models/BetaGroupsResponse';
import type { BetaGroupUpdateRequest } from '../models/BetaGroupUpdateRequest';
import type { BetaPublicLinkUsagesV1MetricResponse } from '../models/BetaPublicLinkUsagesV1MetricResponse';
import type { BetaRecruitmentCriterionCompatibleBuildCheckResponse } from '../models/BetaRecruitmentCriterionCompatibleBuildCheckResponse';
import type { BetaRecruitmentCriterionResponse } from '../models/BetaRecruitmentCriterionResponse';
import type { BetaTestersWithoutIncludesResponse } from '../models/BetaTestersWithoutIncludesResponse';
import type { BuildsWithoutIncludesResponse } from '../models/BuildsWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaGroupsService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterIsInternalGroup filter by attribute 'isInternalGroup'
     * @param filterPublicLinkEnabled filter by attribute 'publicLinkEnabled'
     * @param filterPublicLinkLimitEnabled filter by attribute 'publicLinkLimitEnabled'
     * @param filterPublicLink filter by attribute 'publicLink'
     * @param filterApp filter by id(s) of related 'app'
     * @param filterBuilds filter by id(s) of related 'builds'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsBetaRecruitmentCriteria the fields to include for returned resources of type betaRecruitmentCriteria
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBetaTesters maximum number of related betaTesters returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns BetaGroupsResponse List of BetaGroups
     * @throws ApiError
     */
    public static betaGroupsGetCollection(
        filterName?: Array<string>,
        filterIsInternalGroup?: Array<string>,
        filterPublicLinkEnabled?: Array<string>,
        filterPublicLinkLimitEnabled?: Array<string>,
        filterPublicLink?: Array<string>,
        filterApp?: Array<string>,
        filterBuilds?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'name' | '-name' | 'createdDate' | '-createdDate' | 'publicLinkEnabled' | '-publicLinkEnabled' | 'publicLinkLimit' | '-publicLinkLimit'>,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsBetaRecruitmentCriteria?: Array<'lastModifiedDate' | 'deviceFamilyOsVersionFilters'>,
        limit?: number,
        include?: Array<'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria'>,
        limitBetaTesters?: number,
        limitBuilds?: number,
    ): CancelablePromise<BetaGroupsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups',
            query: {
                'filter[name]': filterName,
                'filter[isInternalGroup]': filterIsInternalGroup,
                'filter[publicLinkEnabled]': filterPublicLinkEnabled,
                'filter[publicLinkLimitEnabled]': filterPublicLinkLimitEnabled,
                'filter[publicLink]': filterPublicLink,
                'filter[app]': filterApp,
                'filter[builds]': filterBuilds,
                'filter[id]': filterId,
                'sort': sort,
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[apps]': fieldsApps,
                'fields[builds]': fieldsBuilds,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[betaRecruitmentCriteria]': fieldsBetaRecruitmentCriteria,
                'limit': limit,
                'include': include,
                'limit[betaTesters]': limitBetaTesters,
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
     * @param requestBody BetaGroup representation
     * @returns BetaGroupResponse Single BetaGroup
     * @throws ApiError
     */
    public static betaGroupsCreateInstance(
        requestBody: BetaGroupCreateRequest,
    ): CancelablePromise<BetaGroupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaGroups',
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
     * @param fieldsBetaGroups the fields to include for returned resources of type betaGroups
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsBuilds the fields to include for returned resources of type builds
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param fieldsBetaRecruitmentCriteria the fields to include for returned resources of type betaRecruitmentCriteria
     * @param include comma-separated list of relationships to include
     * @param limitBetaTesters maximum number of related betaTesters returned (when they are included)
     * @param limitBuilds maximum number of related builds returned (when they are included)
     * @returns BetaGroupResponse Single BetaGroup
     * @throws ApiError
     */
    public static betaGroupsGetInstance(
        id: string,
        fieldsBetaGroups?: Array<'name' | 'createdDate' | 'isInternalGroup' | 'hasAccessToAllBuilds' | 'publicLinkEnabled' | 'publicLinkId' | 'publicLinkLimitEnabled' | 'publicLinkLimit' | 'publicLink' | 'feedbackEnabled' | 'iosBuildsAvailableForAppleSiliconMac' | 'iosBuildsAvailableForAppleVision' | 'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria' | 'betaRecruitmentCriterionCompatibleBuildCheck'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        fieldsBetaRecruitmentCriteria?: Array<'lastModifiedDate' | 'deviceFamilyOsVersionFilters'>,
        include?: Array<'app' | 'builds' | 'betaTesters' | 'betaRecruitmentCriteria'>,
        limitBetaTesters?: number,
        limitBuilds?: number,
    ): CancelablePromise<BetaGroupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaGroups]': fieldsBetaGroups,
                'fields[apps]': fieldsApps,
                'fields[builds]': fieldsBuilds,
                'fields[betaTesters]': fieldsBetaTesters,
                'fields[betaRecruitmentCriteria]': fieldsBetaRecruitmentCriteria,
                'include': include,
                'limit[betaTesters]': limitBetaTesters,
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
     * @param requestBody BetaGroup representation
     * @returns BetaGroupResponse Single BetaGroup
     * @throws ApiError
     */
    public static betaGroupsUpdateInstance(
        id: string,
        requestBody: BetaGroupUpdateRequest,
    ): CancelablePromise<BetaGroupResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaGroups/{id}',
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
    public static betaGroupsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaGroups/{id}',
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
     * @returns BetaGroupAppLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaGroupsAppGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaGroupAppLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/relationships/app',
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
    public static betaGroupsAppGetToOneRelated(
        id: string,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
    ): CancelablePromise<AppWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/app',
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
     * @returns BetaGroupBetaRecruitmentCriteriaLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaGroupsBetaRecruitmentCriteriaGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaGroupBetaRecruitmentCriteriaLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/relationships/betaRecruitmentCriteria',
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
     * @param fieldsBetaRecruitmentCriteria the fields to include for returned resources of type betaRecruitmentCriteria
     * @returns BetaRecruitmentCriterionResponse Single BetaRecruitmentCriterion
     * @throws ApiError
     */
    public static betaGroupsBetaRecruitmentCriteriaGetToOneRelated(
        id: string,
        fieldsBetaRecruitmentCriteria?: Array<'lastModifiedDate' | 'deviceFamilyOsVersionFilters'>,
    ): CancelablePromise<BetaRecruitmentCriterionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/betaRecruitmentCriteria',
            path: {
                'id': id,
            },
            query: {
                'fields[betaRecruitmentCriteria]': fieldsBetaRecruitmentCriteria,
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
     * @returns BetaGroupBetaRecruitmentCriterionCompatibleBuildCheckLinkageResponse Related linkage
     * @throws ApiError
     */
    public static betaGroupsBetaRecruitmentCriterionCompatibleBuildCheckGetToOneRelationship(
        id: string,
    ): CancelablePromise<BetaGroupBetaRecruitmentCriterionCompatibleBuildCheckLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/relationships/betaRecruitmentCriterionCompatibleBuildCheck',
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
     * @param fieldsBetaRecruitmentCriterionCompatibleBuildChecks the fields to include for returned resources of type betaRecruitmentCriterionCompatibleBuildChecks
     * @returns BetaRecruitmentCriterionCompatibleBuildCheckResponse Single BetaRecruitmentCriterionCompatibleBuildCheck
     * @throws ApiError
     */
    public static betaGroupsBetaRecruitmentCriterionCompatibleBuildCheckGetToOneRelated(
        id: string,
        fieldsBetaRecruitmentCriterionCompatibleBuildChecks?: Array<'hasCompatibleBuild'>,
    ): CancelablePromise<BetaRecruitmentCriterionCompatibleBuildCheckResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/betaRecruitmentCriterionCompatibleBuildCheck',
            path: {
                'id': id,
            },
            query: {
                'fields[betaRecruitmentCriterionCompatibleBuildChecks]': fieldsBetaRecruitmentCriterionCompatibleBuildChecks,
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
     * @returns BetaGroupBetaTestersLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static betaGroupsBetaTestersGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaGroupBetaTestersLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/relationships/betaTesters',
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
    public static betaGroupsBetaTestersCreateToManyRelationship(
        id: string,
        requestBody: BetaGroupBetaTestersLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaGroups/{id}/relationships/betaTesters',
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
    public static betaGroupsBetaTestersDeleteToManyRelationship(
        id: string,
        requestBody: BetaGroupBetaTestersLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaGroups/{id}/relationships/betaTesters',
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
     * @param fieldsBetaTesters the fields to include for returned resources of type betaTesters
     * @param limit maximum resources per page
     * @returns BetaTestersWithoutIncludesResponse List of BetaTesters with get
     * @throws ApiError
     */
    public static betaGroupsBetaTestersGetToManyRelated(
        id: string,
        fieldsBetaTesters?: Array<'firstName' | 'lastName' | 'email' | 'inviteType' | 'state' | 'apps' | 'betaGroups' | 'builds'>,
        limit?: number,
    ): CancelablePromise<BetaTestersWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/betaTesters',
            path: {
                'id': id,
            },
            query: {
                'fields[betaTesters]': fieldsBetaTesters,
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
     * @returns BetaGroupBuildsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static betaGroupsBuildsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaGroupBuildsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/relationships/builds',
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
    public static betaGroupsBuildsCreateToManyRelationship(
        id: string,
        requestBody: BetaGroupBuildsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaGroups/{id}/relationships/builds',
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
    public static betaGroupsBuildsDeleteToManyRelationship(
        id: string,
        requestBody: BetaGroupBuildsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaGroups/{id}/relationships/builds',
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
    public static betaGroupsBuildsGetToManyRelated(
        id: string,
        fieldsBuilds?: Array<'version' | 'uploadedDate' | 'expirationDate' | 'expired' | 'minOsVersion' | 'lsMinimumSystemVersion' | 'computedMinMacOsVersion' | 'computedMinVisionOsVersion' | 'iconAssetToken' | 'processingState' | 'buildAudienceType' | 'usesNonExemptEncryption' | 'preReleaseVersion' | 'individualTesters' | 'betaGroups' | 'betaBuildLocalizations' | 'appEncryptionDeclaration' | 'betaAppReviewSubmission' | 'app' | 'buildBetaDetail' | 'appStoreVersion' | 'icons' | 'buildBundles' | 'perfPowerMetrics' | 'diagnosticSignatures'>,
        limit?: number,
    ): CancelablePromise<BuildsWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/builds',
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
     * @param period the duration of the reporting period
     * @param groupBy the dimension by which to group the results
     * @param filterBetaTesters filter by 'betaTesters' relationship dimension
     * @param limit maximum number of groups to return per page
     * @returns AppsBetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaGroupsBetaTesterUsagesGetMetrics(
        id: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        groupBy?: Array<'betaTesters'>,
        filterBetaTesters?: string,
        limit?: number,
    ): CancelablePromise<AppsBetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'groupBy': groupBy,
                'filter[betaTesters]': filterBetaTesters,
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
     * @param limit maximum number of groups to return per page
     * @returns BetaPublicLinkUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaGroupsPublicLinkUsagesGetMetrics(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaPublicLinkUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/metrics/publicLinkUsages',
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
}
