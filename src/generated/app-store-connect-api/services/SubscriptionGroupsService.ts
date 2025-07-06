/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionGroupCreateRequest } from '../models/SubscriptionGroupCreateRequest';
import type { SubscriptionGroupLocalizationsResponse } from '../models/SubscriptionGroupLocalizationsResponse';
import type { SubscriptionGroupResponse } from '../models/SubscriptionGroupResponse';
import type { SubscriptionGroupSubscriptionGroupLocalizationsLinkagesResponse } from '../models/SubscriptionGroupSubscriptionGroupLocalizationsLinkagesResponse';
import type { SubscriptionGroupSubscriptionsLinkagesResponse } from '../models/SubscriptionGroupSubscriptionsLinkagesResponse';
import type { SubscriptionGroupUpdateRequest } from '../models/SubscriptionGroupUpdateRequest';
import type { SubscriptionsResponse } from '../models/SubscriptionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionGroupsService {
    /**
     * @param requestBody SubscriptionGroup representation
     * @returns SubscriptionGroupResponse Single SubscriptionGroup
     * @throws ApiError
     */
    public static subscriptionGroupsCreateInstance(
        requestBody: SubscriptionGroupCreateRequest,
    ): CancelablePromise<SubscriptionGroupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionGroups',
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
     * @param fieldsSubscriptionGroups the fields to include for returned resources of type subscriptionGroups
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionGroupLocalizations the fields to include for returned resources of type subscriptionGroupLocalizations
     * @param include comma-separated list of relationships to include
     * @param limitSubscriptionGroupLocalizations maximum number of related subscriptionGroupLocalizations returned (when they are included)
     * @param limitSubscriptions maximum number of related subscriptions returned (when they are included)
     * @returns SubscriptionGroupResponse Single SubscriptionGroup
     * @throws ApiError
     */
    public static subscriptionGroupsGetInstance(
        id: string,
        fieldsSubscriptionGroups?: Array<'referenceName' | 'subscriptions' | 'subscriptionGroupLocalizations'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionGroupLocalizations?: Array<'name' | 'customAppName' | 'locale' | 'state' | 'subscriptionGroup'>,
        include?: Array<'subscriptions' | 'subscriptionGroupLocalizations'>,
        limitSubscriptionGroupLocalizations?: number,
        limitSubscriptions?: number,
    ): CancelablePromise<SubscriptionGroupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroups/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionGroups]': fieldsSubscriptionGroups,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionGroupLocalizations]': fieldsSubscriptionGroupLocalizations,
                'include': include,
                'limit[subscriptionGroupLocalizations]': limitSubscriptionGroupLocalizations,
                'limit[subscriptions]': limitSubscriptions,
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
     * @param requestBody SubscriptionGroup representation
     * @returns SubscriptionGroupResponse Single SubscriptionGroup
     * @throws ApiError
     */
    public static subscriptionGroupsUpdateInstance(
        id: string,
        requestBody: SubscriptionGroupUpdateRequest,
    ): CancelablePromise<SubscriptionGroupResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionGroups/{id}',
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
    public static subscriptionGroupsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionGroups/{id}',
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
     * @returns SubscriptionGroupSubscriptionGroupLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionGroupsSubscriptionGroupLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionGroupSubscriptionGroupLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroups/{id}/relationships/subscriptionGroupLocalizations',
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
     * @param fieldsSubscriptionGroupLocalizations the fields to include for returned resources of type subscriptionGroupLocalizations
     * @param fieldsSubscriptionGroups the fields to include for returned resources of type subscriptionGroups
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionGroupLocalizationsResponse List of SubscriptionGroupLocalizations
     * @throws ApiError
     */
    public static subscriptionGroupsSubscriptionGroupLocalizationsGetToManyRelated(
        id: string,
        fieldsSubscriptionGroupLocalizations?: Array<'name' | 'customAppName' | 'locale' | 'state' | 'subscriptionGroup'>,
        fieldsSubscriptionGroups?: Array<'referenceName' | 'subscriptions' | 'subscriptionGroupLocalizations'>,
        limit?: number,
        include?: Array<'subscriptionGroup'>,
    ): CancelablePromise<SubscriptionGroupLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroups/{id}/subscriptionGroupLocalizations',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionGroupLocalizations]': fieldsSubscriptionGroupLocalizations,
                'fields[subscriptionGroups]': fieldsSubscriptionGroups,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns SubscriptionGroupSubscriptionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionGroupsSubscriptionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionGroupSubscriptionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroups/{id}/relationships/subscriptions',
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
     * @param filterProductId filter by attribute 'productId'
     * @param filterName filter by attribute 'name'
     * @param filterState filter by attribute 'state'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionLocalizations the fields to include for returned resources of type subscriptionLocalizations
     * @param fieldsSubscriptionAppStoreReviewScreenshots the fields to include for returned resources of type subscriptionAppStoreReviewScreenshots
     * @param fieldsSubscriptionGroups the fields to include for returned resources of type subscriptionGroups
     * @param fieldsSubscriptionIntroductoryOffers the fields to include for returned resources of type subscriptionIntroductoryOffers
     * @param fieldsSubscriptionPromotionalOffers the fields to include for returned resources of type subscriptionPromotionalOffers
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param fieldsSubscriptionPrices the fields to include for returned resources of type subscriptionPrices
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsSubscriptionAvailabilities the fields to include for returned resources of type subscriptionAvailabilities
     * @param fieldsWinBackOffers the fields to include for returned resources of type winBackOffers
     * @param fieldsSubscriptionImages the fields to include for returned resources of type subscriptionImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitSubscriptionLocalizations maximum number of related subscriptionLocalizations returned (when they are included)
     * @param limitIntroductoryOffers maximum number of related introductoryOffers returned (when they are included)
     * @param limitPromotionalOffers maximum number of related promotionalOffers returned (when they are included)
     * @param limitOfferCodes maximum number of related offerCodes returned (when they are included)
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @param limitWinBackOffers maximum number of related winBackOffers returned (when they are included)
     * @param limitImages maximum number of related images returned (when they are included)
     * @returns SubscriptionsResponse List of Subscriptions
     * @throws ApiError
     */
    public static subscriptionGroupsSubscriptionsGetToManyRelated(
        id: string,
        filterProductId?: Array<string>,
        filterName?: Array<string>,
        filterState?: Array<'MISSING_METADATA' | 'READY_TO_SUBMIT' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'DEVELOPER_ACTION_NEEDED' | 'PENDING_BINARY_APPROVAL' | 'APPROVED' | 'DEVELOPER_REMOVED_FROM_SALE' | 'REMOVED_FROM_SALE' | 'REJECTED'>,
        sort?: Array<'name' | '-name'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'subscription'>,
        fieldsSubscriptionAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'subscription'>,
        fieldsSubscriptionGroups?: Array<'referenceName' | 'subscriptions' | 'subscriptionGroupLocalizations'>,
        fieldsSubscriptionIntroductoryOffers?: Array<'startDate' | 'endDate' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'subscription' | 'territory' | 'subscriptionPricePoint'>,
        fieldsSubscriptionPromotionalOffers?: Array<'duration' | 'name' | 'numberOfPeriods' | 'offerCode' | 'offerMode' | 'subscription' | 'prices'>,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        fieldsSubscriptionPrices?: Array<'startDate' | 'preserved' | 'territory' | 'subscriptionPricePoint'>,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsSubscriptionAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsWinBackOffers?: Array<'referenceName' | 'offerId' | 'duration' | 'offerMode' | 'periodCount' | 'customerEligibilityPaidSubscriptionDurationInMonths' | 'customerEligibilityTimeSinceLastSubscribedInMonths' | 'customerEligibilityWaitBetweenOffersInMonths' | 'startDate' | 'endDate' | 'priority' | 'promotionIntent' | 'prices'>,
        fieldsSubscriptionImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'subscription'>,
        limit?: number,
        include?: Array<'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        limitSubscriptionLocalizations?: number,
        limitIntroductoryOffers?: number,
        limitPromotionalOffers?: number,
        limitOfferCodes?: number,
        limitPrices?: number,
        limitWinBackOffers?: number,
        limitImages?: number,
    ): CancelablePromise<SubscriptionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroups/{id}/subscriptions',
            path: {
                'id': id,
            },
            query: {
                'filter[productId]': filterProductId,
                'filter[name]': filterName,
                'filter[state]': filterState,
                'sort': sort,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionLocalizations]': fieldsSubscriptionLocalizations,
                'fields[subscriptionAppStoreReviewScreenshots]': fieldsSubscriptionAppStoreReviewScreenshots,
                'fields[subscriptionGroups]': fieldsSubscriptionGroups,
                'fields[subscriptionIntroductoryOffers]': fieldsSubscriptionIntroductoryOffers,
                'fields[subscriptionPromotionalOffers]': fieldsSubscriptionPromotionalOffers,
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
                'fields[subscriptionPrices]': fieldsSubscriptionPrices,
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[subscriptionAvailabilities]': fieldsSubscriptionAvailabilities,
                'fields[winBackOffers]': fieldsWinBackOffers,
                'fields[subscriptionImages]': fieldsSubscriptionImages,
                'limit': limit,
                'include': include,
                'limit[subscriptionLocalizations]': limitSubscriptionLocalizations,
                'limit[introductoryOffers]': limitIntroductoryOffers,
                'limit[promotionalOffers]': limitPromotionalOffers,
                'limit[offerCodes]': limitOfferCodes,
                'limit[prices]': limitPrices,
                'limit[winBackOffers]': limitWinBackOffers,
                'limit[images]': limitImages,
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
