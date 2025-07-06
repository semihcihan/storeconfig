/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromotedPurchaseResponse } from '../models/PromotedPurchaseResponse';
import type { SubscriptionAppStoreReviewScreenshotLinkageResponse } from '../models/SubscriptionAppStoreReviewScreenshotLinkageResponse';
import type { SubscriptionAppStoreReviewScreenshotResponse } from '../models/SubscriptionAppStoreReviewScreenshotResponse';
import type { SubscriptionAvailabilityResponse } from '../models/SubscriptionAvailabilityResponse';
import type { SubscriptionCreateRequest } from '../models/SubscriptionCreateRequest';
import type { SubscriptionImagesLinkagesResponse } from '../models/SubscriptionImagesLinkagesResponse';
import type { SubscriptionImagesResponse } from '../models/SubscriptionImagesResponse';
import type { SubscriptionIntroductoryOffersLinkagesRequest } from '../models/SubscriptionIntroductoryOffersLinkagesRequest';
import type { SubscriptionIntroductoryOffersLinkagesResponse } from '../models/SubscriptionIntroductoryOffersLinkagesResponse';
import type { SubscriptionIntroductoryOffersResponse } from '../models/SubscriptionIntroductoryOffersResponse';
import type { SubscriptionLocalizationsResponse } from '../models/SubscriptionLocalizationsResponse';
import type { SubscriptionOfferCodesLinkagesResponse } from '../models/SubscriptionOfferCodesLinkagesResponse';
import type { SubscriptionOfferCodesResponse } from '../models/SubscriptionOfferCodesResponse';
import type { SubscriptionPricePointsLinkagesResponse } from '../models/SubscriptionPricePointsLinkagesResponse';
import type { SubscriptionPricePointsResponse } from '../models/SubscriptionPricePointsResponse';
import type { SubscriptionPricesLinkagesRequest } from '../models/SubscriptionPricesLinkagesRequest';
import type { SubscriptionPricesLinkagesResponse } from '../models/SubscriptionPricesLinkagesResponse';
import type { SubscriptionPricesResponse } from '../models/SubscriptionPricesResponse';
import type { SubscriptionPromotedPurchaseLinkageResponse } from '../models/SubscriptionPromotedPurchaseLinkageResponse';
import type { SubscriptionPromotionalOffersLinkagesResponse } from '../models/SubscriptionPromotionalOffersLinkagesResponse';
import type { SubscriptionPromotionalOffersResponse } from '../models/SubscriptionPromotionalOffersResponse';
import type { SubscriptionResponse } from '../models/SubscriptionResponse';
import type { SubscriptionSubscriptionAvailabilityLinkageResponse } from '../models/SubscriptionSubscriptionAvailabilityLinkageResponse';
import type { SubscriptionSubscriptionLocalizationsLinkagesResponse } from '../models/SubscriptionSubscriptionLocalizationsLinkagesResponse';
import type { SubscriptionUpdateRequest } from '../models/SubscriptionUpdateRequest';
import type { SubscriptionWinBackOffersLinkagesResponse } from '../models/SubscriptionWinBackOffersLinkagesResponse';
import type { WinBackOffersResponse } from '../models/WinBackOffersResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionsService {
    /**
     * @param requestBody Subscription representation
     * @returns SubscriptionResponse Single Subscription
     * @throws ApiError
     */
    public static subscriptionsCreateInstance(
        requestBody: SubscriptionCreateRequest,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptions',
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
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionLocalizations the fields to include for returned resources of type subscriptionLocalizations
     * @param fieldsSubscriptionAppStoreReviewScreenshots the fields to include for returned resources of type subscriptionAppStoreReviewScreenshots
     * @param fieldsSubscriptionIntroductoryOffers the fields to include for returned resources of type subscriptionIntroductoryOffers
     * @param fieldsSubscriptionPromotionalOffers the fields to include for returned resources of type subscriptionPromotionalOffers
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param fieldsSubscriptionPrices the fields to include for returned resources of type subscriptionPrices
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsSubscriptionAvailabilities the fields to include for returned resources of type subscriptionAvailabilities
     * @param fieldsWinBackOffers the fields to include for returned resources of type winBackOffers
     * @param fieldsSubscriptionImages the fields to include for returned resources of type subscriptionImages
     * @param include comma-separated list of relationships to include
     * @param limitImages maximum number of related images returned (when they are included)
     * @param limitIntroductoryOffers maximum number of related introductoryOffers returned (when they are included)
     * @param limitOfferCodes maximum number of related offerCodes returned (when they are included)
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @param limitPromotionalOffers maximum number of related promotionalOffers returned (when they are included)
     * @param limitSubscriptionLocalizations maximum number of related subscriptionLocalizations returned (when they are included)
     * @param limitWinBackOffers maximum number of related winBackOffers returned (when they are included)
     * @returns SubscriptionResponse Single Subscription
     * @throws ApiError
     */
    public static subscriptionsGetInstance(
        id: string,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'subscription'>,
        fieldsSubscriptionAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'subscription'>,
        fieldsSubscriptionIntroductoryOffers?: Array<'startDate' | 'endDate' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'subscription' | 'territory' | 'subscriptionPricePoint'>,
        fieldsSubscriptionPromotionalOffers?: Array<'duration' | 'name' | 'numberOfPeriods' | 'offerCode' | 'offerMode' | 'subscription' | 'prices'>,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        fieldsSubscriptionPrices?: Array<'startDate' | 'preserved' | 'territory' | 'subscriptionPricePoint'>,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsSubscriptionAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsWinBackOffers?: Array<'referenceName' | 'offerId' | 'duration' | 'offerMode' | 'periodCount' | 'customerEligibilityPaidSubscriptionDurationInMonths' | 'customerEligibilityTimeSinceLastSubscribedInMonths' | 'customerEligibilityWaitBetweenOffersInMonths' | 'startDate' | 'endDate' | 'priority' | 'promotionIntent' | 'prices'>,
        fieldsSubscriptionImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'subscription'>,
        include?: Array<'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        limitImages?: number,
        limitIntroductoryOffers?: number,
        limitOfferCodes?: number,
        limitPrices?: number,
        limitPromotionalOffers?: number,
        limitSubscriptionLocalizations?: number,
        limitWinBackOffers?: number,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionLocalizations]': fieldsSubscriptionLocalizations,
                'fields[subscriptionAppStoreReviewScreenshots]': fieldsSubscriptionAppStoreReviewScreenshots,
                'fields[subscriptionIntroductoryOffers]': fieldsSubscriptionIntroductoryOffers,
                'fields[subscriptionPromotionalOffers]': fieldsSubscriptionPromotionalOffers,
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
                'fields[subscriptionPrices]': fieldsSubscriptionPrices,
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[subscriptionAvailabilities]': fieldsSubscriptionAvailabilities,
                'fields[winBackOffers]': fieldsWinBackOffers,
                'fields[subscriptionImages]': fieldsSubscriptionImages,
                'include': include,
                'limit[images]': limitImages,
                'limit[introductoryOffers]': limitIntroductoryOffers,
                'limit[offerCodes]': limitOfferCodes,
                'limit[prices]': limitPrices,
                'limit[promotionalOffers]': limitPromotionalOffers,
                'limit[subscriptionLocalizations]': limitSubscriptionLocalizations,
                'limit[winBackOffers]': limitWinBackOffers,
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
     * @param requestBody Subscription representation
     * @returns SubscriptionResponse Single Subscription
     * @throws ApiError
     */
    public static subscriptionsUpdateInstance(
        id: string,
        requestBody: SubscriptionUpdateRequest,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptions/{id}',
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
    public static subscriptionsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptions/{id}',
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
     * @returns SubscriptionAppStoreReviewScreenshotLinkageResponse Related linkage
     * @throws ApiError
     */
    public static subscriptionsAppStoreReviewScreenshotGetToOneRelationship(
        id: string,
    ): CancelablePromise<SubscriptionAppStoreReviewScreenshotLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/appStoreReviewScreenshot',
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
     * @param fieldsSubscriptionAppStoreReviewScreenshots the fields to include for returned resources of type subscriptionAppStoreReviewScreenshots
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionAppStoreReviewScreenshotResponse Single SubscriptionAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static subscriptionsAppStoreReviewScreenshotGetToOneRelated(
        id: string,
        fieldsSubscriptionAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'subscription'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/appStoreReviewScreenshot',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionAppStoreReviewScreenshots]': fieldsSubscriptionAppStoreReviewScreenshots,
                'fields[subscriptions]': fieldsSubscriptions,
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
     * @returns SubscriptionImagesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsImagesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionImagesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/images',
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
     * @param fieldsSubscriptionImages the fields to include for returned resources of type subscriptionImages
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionImagesResponse List of SubscriptionImages
     * @throws ApiError
     */
    public static subscriptionsImagesGetToManyRelated(
        id: string,
        fieldsSubscriptionImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'subscription'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        limit?: number,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionImagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/images',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionImages]': fieldsSubscriptionImages,
                'fields[subscriptions]': fieldsSubscriptions,
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
     * @returns SubscriptionIntroductoryOffersLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsIntroductoryOffersGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionIntroductoryOffersLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/introductoryOffers',
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
    public static subscriptionsIntroductoryOffersDeleteToManyRelationship(
        id: string,
        requestBody: SubscriptionIntroductoryOffersLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptions/{id}/relationships/introductoryOffers',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsSubscriptionIntroductoryOffers the fields to include for returned resources of type subscriptionIntroductoryOffers
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionIntroductoryOffersResponse List of SubscriptionIntroductoryOffers
     * @throws ApiError
     */
    public static subscriptionsIntroductoryOffersGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionIntroductoryOffers?: Array<'startDate' | 'endDate' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'subscription' | 'territory' | 'subscriptionPricePoint'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        limit?: number,
        include?: Array<'subscription' | 'territory' | 'subscriptionPricePoint'>,
    ): CancelablePromise<SubscriptionIntroductoryOffersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/introductoryOffers',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionIntroductoryOffers]': fieldsSubscriptionIntroductoryOffers,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[territories]': fieldsTerritories,
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
     * @returns SubscriptionOfferCodesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsOfferCodesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionOfferCodesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/offerCodes',
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
     * @param filterTerritory filter by territory
     * @param fieldsSubscriptionOfferCodes the fields to include for returned resources of type subscriptionOfferCodes
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionOfferCodeOneTimeUseCodes the fields to include for returned resources of type subscriptionOfferCodeOneTimeUseCodes
     * @param fieldsSubscriptionOfferCodeCustomCodes the fields to include for returned resources of type subscriptionOfferCodeCustomCodes
     * @param fieldsSubscriptionOfferCodePrices the fields to include for returned resources of type subscriptionOfferCodePrices
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitOneTimeUseCodes maximum number of related oneTimeUseCodes returned (when they are included)
     * @param limitCustomCodes maximum number of related customCodes returned (when they are included)
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns SubscriptionOfferCodesResponse List of SubscriptionOfferCodes
     * @throws ApiError
     */
    public static subscriptionsOfferCodesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionOfferCodes?: Array<'name' | 'customerEligibilities' | 'offerEligibility' | 'duration' | 'offerMode' | 'numberOfPeriods' | 'active' | 'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionOfferCodeOneTimeUseCodes?: Array<'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode' | 'values'>,
        fieldsSubscriptionOfferCodeCustomCodes?: Array<'customCode' | 'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode'>,
        fieldsSubscriptionOfferCodePrices?: Array<'territory' | 'subscriptionPricePoint'>,
        limit?: number,
        include?: Array<'subscription' | 'oneTimeUseCodes' | 'customCodes' | 'prices'>,
        limitOneTimeUseCodes?: number,
        limitCustomCodes?: number,
        limitPrices?: number,
    ): CancelablePromise<SubscriptionOfferCodesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/offerCodes',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionOfferCodes]': fieldsSubscriptionOfferCodes,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionOfferCodeOneTimeUseCodes]': fieldsSubscriptionOfferCodeOneTimeUseCodes,
                'fields[subscriptionOfferCodeCustomCodes]': fieldsSubscriptionOfferCodeCustomCodes,
                'fields[subscriptionOfferCodePrices]': fieldsSubscriptionOfferCodePrices,
                'limit': limit,
                'include': include,
                'limit[oneTimeUseCodes]': limitOneTimeUseCodes,
                'limit[customCodes]': limitCustomCodes,
                'limit[prices]': limitPrices,
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
     * @returns SubscriptionPricePointsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsPricePointsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionPricePointsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/pricePoints',
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
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionPricePointsResponse List of SubscriptionPricePoints
     * @throws ApiError
     */
    public static subscriptionsPricePointsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<SubscriptionPricePointsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/pricePoints',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns SubscriptionPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/prices',
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
    public static subscriptionsPricesDeleteToManyRelationship(
        id: string,
        requestBody: SubscriptionPricesLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptions/{id}/relationships/prices',
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
     * @param filterSubscriptionPricePoint filter by id(s) of related 'subscriptionPricePoint'
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsSubscriptionPrices the fields to include for returned resources of type subscriptionPrices
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionPricesResponse List of SubscriptionPrices
     * @throws ApiError
     */
    public static subscriptionsPricesGetToManyRelated(
        id: string,
        filterSubscriptionPricePoint?: Array<string>,
        filterTerritory?: Array<string>,
        fieldsSubscriptionPrices?: Array<'startDate' | 'preserved' | 'territory' | 'subscriptionPricePoint'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        limit?: number,
        include?: Array<'territory' | 'subscriptionPricePoint'>,
    ): CancelablePromise<SubscriptionPricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/prices',
            path: {
                'id': id,
            },
            query: {
                'filter[subscriptionPricePoint]': filterSubscriptionPricePoint,
                'filter[territory]': filterTerritory,
                'fields[subscriptionPrices]': fieldsSubscriptionPrices,
                'fields[territories]': fieldsTerritories,
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
     * @returns SubscriptionPromotedPurchaseLinkageResponse Related linkage
     * @throws ApiError
     */
    public static subscriptionsPromotedPurchaseGetToOneRelationship(
        id: string,
    ): CancelablePromise<SubscriptionPromotedPurchaseLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/promotedPurchase',
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
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param include comma-separated list of relationships to include
     * @returns PromotedPurchaseResponse Single PromotedPurchase
     * @throws ApiError
     */
    public static subscriptionsPromotedPurchaseGetToOneRelated(
        id: string,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        include?: Array<'inAppPurchaseV2' | 'subscription'>,
    ): CancelablePromise<PromotedPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/promotedPurchase',
            path: {
                'id': id,
            },
            query: {
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[subscriptions]': fieldsSubscriptions,
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
     * @returns SubscriptionPromotionalOffersLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsPromotionalOffersGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionPromotionalOffersLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/promotionalOffers',
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
     * @param filterTerritory filter by territory
     * @param fieldsSubscriptionPromotionalOffers the fields to include for returned resources of type subscriptionPromotionalOffers
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param fieldsSubscriptionPromotionalOfferPrices the fields to include for returned resources of type subscriptionPromotionalOfferPrices
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns SubscriptionPromotionalOffersResponse List of SubscriptionPromotionalOffers
     * @throws ApiError
     */
    public static subscriptionsPromotionalOffersGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsSubscriptionPromotionalOffers?: Array<'duration' | 'name' | 'numberOfPeriods' | 'offerCode' | 'offerMode' | 'subscription' | 'prices'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        fieldsSubscriptionPromotionalOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        limit?: number,
        include?: Array<'subscription' | 'prices'>,
        limitPrices?: number,
    ): CancelablePromise<SubscriptionPromotionalOffersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/promotionalOffers',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[subscriptionPromotionalOffers]': fieldsSubscriptionPromotionalOffers,
                'fields[subscriptions]': fieldsSubscriptions,
                'fields[subscriptionPromotionalOfferPrices]': fieldsSubscriptionPromotionalOfferPrices,
                'limit': limit,
                'include': include,
                'limit[prices]': limitPrices,
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
     * @returns SubscriptionSubscriptionAvailabilityLinkageResponse Related linkage
     * @throws ApiError
     */
    public static subscriptionsSubscriptionAvailabilityGetToOneRelationship(
        id: string,
    ): CancelablePromise<SubscriptionSubscriptionAvailabilityLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/subscriptionAvailability',
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
     * @param fieldsSubscriptionAvailabilities the fields to include for returned resources of type subscriptionAvailabilities
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param include comma-separated list of relationships to include
     * @param limitAvailableTerritories maximum number of related availableTerritories returned (when they are included)
     * @returns SubscriptionAvailabilityResponse Single SubscriptionAvailability
     * @throws ApiError
     */
    public static subscriptionsSubscriptionAvailabilityGetToOneRelated(
        id: string,
        fieldsSubscriptionAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsTerritories?: Array<'currency'>,
        include?: Array<'availableTerritories'>,
        limitAvailableTerritories?: number,
    ): CancelablePromise<SubscriptionAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/subscriptionAvailability',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionAvailabilities]': fieldsSubscriptionAvailabilities,
                'fields[territories]': fieldsTerritories,
                'include': include,
                'limit[availableTerritories]': limitAvailableTerritories,
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
     * @returns SubscriptionSubscriptionLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsSubscriptionLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionSubscriptionLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/subscriptionLocalizations',
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
     * @param fieldsSubscriptionLocalizations the fields to include for returned resources of type subscriptionLocalizations
     * @param fieldsSubscriptions the fields to include for returned resources of type subscriptions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionLocalizationsResponse List of SubscriptionLocalizations
     * @throws ApiError
     */
    public static subscriptionsSubscriptionLocalizationsGetToManyRelated(
        id: string,
        fieldsSubscriptionLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'subscription'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        limit?: number,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/subscriptionLocalizations',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionLocalizations]': fieldsSubscriptionLocalizations,
                'fields[subscriptions]': fieldsSubscriptions,
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
     * @returns SubscriptionWinBackOffersLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionsWinBackOffersGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionWinBackOffersLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/relationships/winBackOffers',
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
     * @param fieldsWinBackOffers the fields to include for returned resources of type winBackOffers
     * @param fieldsWinBackOfferPrices the fields to include for returned resources of type winBackOfferPrices
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitPrices maximum number of related prices returned (when they are included)
     * @returns WinBackOffersResponse List of WinBackOffers
     * @throws ApiError
     */
    public static subscriptionsWinBackOffersGetToManyRelated(
        id: string,
        fieldsWinBackOffers?: Array<'referenceName' | 'offerId' | 'duration' | 'offerMode' | 'periodCount' | 'customerEligibilityPaidSubscriptionDurationInMonths' | 'customerEligibilityTimeSinceLastSubscribedInMonths' | 'customerEligibilityWaitBetweenOffersInMonths' | 'startDate' | 'endDate' | 'priority' | 'promotionIntent' | 'prices'>,
        fieldsWinBackOfferPrices?: Array<'territory' | 'subscriptionPricePoint'>,
        limit?: number,
        include?: Array<'prices'>,
        limitPrices?: number,
    ): CancelablePromise<WinBackOffersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptions/{id}/winBackOffers',
            path: {
                'id': id,
            },
            query: {
                'fields[winBackOffers]': fieldsWinBackOffers,
                'fields[winBackOfferPrices]': fieldsWinBackOfferPrices,
                'limit': limit,
                'include': include,
                'limit[prices]': limitPrices,
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
