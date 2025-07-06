/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseAppStoreReviewScreenshotResponse } from '../models/InAppPurchaseAppStoreReviewScreenshotResponse';
import type { InAppPurchaseAvailabilityResponse } from '../models/InAppPurchaseAvailabilityResponse';
import type { InAppPurchaseContentResponse } from '../models/InAppPurchaseContentResponse';
import type { InAppPurchaseImagesResponse } from '../models/InAppPurchaseImagesResponse';
import type { InAppPurchaseLocalizationsResponse } from '../models/InAppPurchaseLocalizationsResponse';
import type { InAppPurchasePricePointsResponse } from '../models/InAppPurchasePricePointsResponse';
import type { InAppPurchasePriceScheduleResponse } from '../models/InAppPurchasePriceScheduleResponse';
import type { InAppPurchaseResponse } from '../models/InAppPurchaseResponse';
import type { InAppPurchaseV2AppStoreReviewScreenshotLinkageResponse } from '../models/InAppPurchaseV2AppStoreReviewScreenshotLinkageResponse';
import type { InAppPurchaseV2ContentLinkageResponse } from '../models/InAppPurchaseV2ContentLinkageResponse';
import type { InAppPurchaseV2CreateRequest } from '../models/InAppPurchaseV2CreateRequest';
import type { InAppPurchaseV2IapPriceScheduleLinkageResponse } from '../models/InAppPurchaseV2IapPriceScheduleLinkageResponse';
import type { InAppPurchaseV2ImagesLinkagesResponse } from '../models/InAppPurchaseV2ImagesLinkagesResponse';
import type { InAppPurchaseV2InAppPurchaseAvailabilityLinkageResponse } from '../models/InAppPurchaseV2InAppPurchaseAvailabilityLinkageResponse';
import type { InAppPurchaseV2InAppPurchaseLocalizationsLinkagesResponse } from '../models/InAppPurchaseV2InAppPurchaseLocalizationsLinkagesResponse';
import type { InAppPurchaseV2PricePointsLinkagesResponse } from '../models/InAppPurchaseV2PricePointsLinkagesResponse';
import type { InAppPurchaseV2PromotedPurchaseLinkageResponse } from '../models/InAppPurchaseV2PromotedPurchaseLinkageResponse';
import type { InAppPurchaseV2Response } from '../models/InAppPurchaseV2Response';
import type { InAppPurchaseV2UpdateRequest } from '../models/InAppPurchaseV2UpdateRequest';
import type { PromotedPurchaseResponse } from '../models/PromotedPurchaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchasesService {
    /**
     * @deprecated
     * @param id the id of the requested resource
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param include comma-separated list of relationships to include
     * @param limitApps maximum number of related apps returned (when they are included)
     * @returns InAppPurchaseResponse Single InAppPurchase
     * @throws ApiError
     */
    public static inAppPurchasesGetInstance(
        id: string,
        fieldsInAppPurchases?: Array<'referenceName' | 'productId' | 'inAppPurchaseType' | 'state' | 'apps'>,
        include?: Array<'apps'>,
        limitApps?: number,
    ): CancelablePromise<InAppPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'include': include,
                'limit[apps]': limitApps,
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
     * @param requestBody InAppPurchase representation
     * @returns InAppPurchaseV2Response Single InAppPurchase
     * @throws ApiError
     */
    public static inAppPurchasesV2CreateInstance(
        requestBody: InAppPurchaseV2CreateRequest,
    ): CancelablePromise<InAppPurchaseV2Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/inAppPurchases',
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
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param fieldsInAppPurchaseLocalizations the fields to include for returned resources of type inAppPurchaseLocalizations
     * @param fieldsInAppPurchasePricePoints the fields to include for returned resources of type inAppPurchasePricePoints
     * @param fieldsInAppPurchaseContents the fields to include for returned resources of type inAppPurchaseContents
     * @param fieldsInAppPurchaseAppStoreReviewScreenshots the fields to include for returned resources of type inAppPurchaseAppStoreReviewScreenshots
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param fieldsInAppPurchasePriceSchedules the fields to include for returned resources of type inAppPurchasePriceSchedules
     * @param fieldsInAppPurchaseAvailabilities the fields to include for returned resources of type inAppPurchaseAvailabilities
     * @param fieldsInAppPurchaseImages the fields to include for returned resources of type inAppPurchaseImages
     * @param include comma-separated list of relationships to include
     * @param limitImages maximum number of related images returned (when they are included)
     * @param limitInAppPurchaseLocalizations maximum number of related inAppPurchaseLocalizations returned (when they are included)
     * @param limitPricePoints maximum number of related pricePoints returned (when they are included)
     * @returns InAppPurchaseV2Response Single InAppPurchase
     * @throws ApiError
     */
    public static inAppPurchasesV2GetInstance(
        id: string,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsInAppPurchaseLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'inAppPurchaseV2'>,
        fieldsInAppPurchasePricePoints?: Array<'customerPrice' | 'proceeds' | 'territory' | 'equalizations'>,
        fieldsInAppPurchaseContents?: Array<'fileName' | 'fileSize' | 'url' | 'lastModifiedDate' | 'inAppPurchaseV2'>,
        fieldsInAppPurchaseAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'inAppPurchaseV2'>,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsInAppPurchasePriceSchedules?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsInAppPurchaseAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsInAppPurchaseImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'inAppPurchase'>,
        include?: Array<'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        limitImages?: number,
        limitInAppPurchaseLocalizations?: number,
        limitPricePoints?: number,
    ): CancelablePromise<InAppPurchaseV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchases]': fieldsInAppPurchases,
                'fields[inAppPurchaseLocalizations]': fieldsInAppPurchaseLocalizations,
                'fields[inAppPurchasePricePoints]': fieldsInAppPurchasePricePoints,
                'fields[inAppPurchaseContents]': fieldsInAppPurchaseContents,
                'fields[inAppPurchaseAppStoreReviewScreenshots]': fieldsInAppPurchaseAppStoreReviewScreenshots,
                'fields[promotedPurchases]': fieldsPromotedPurchases,
                'fields[inAppPurchasePriceSchedules]': fieldsInAppPurchasePriceSchedules,
                'fields[inAppPurchaseAvailabilities]': fieldsInAppPurchaseAvailabilities,
                'fields[inAppPurchaseImages]': fieldsInAppPurchaseImages,
                'include': include,
                'limit[images]': limitImages,
                'limit[inAppPurchaseLocalizations]': limitInAppPurchaseLocalizations,
                'limit[pricePoints]': limitPricePoints,
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
     * @param requestBody InAppPurchase representation
     * @returns InAppPurchaseV2Response Single InAppPurchase
     * @throws ApiError
     */
    public static inAppPurchasesV2UpdateInstance(
        id: string,
        requestBody: InAppPurchaseV2UpdateRequest,
    ): CancelablePromise<InAppPurchaseV2Response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v2/inAppPurchases/{id}',
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
    public static inAppPurchasesV2DeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/inAppPurchases/{id}',
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
     * @returns InAppPurchaseV2AppStoreReviewScreenshotLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasesV2AppStoreReviewScreenshotGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchaseV2AppStoreReviewScreenshotLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/appStoreReviewScreenshot',
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
     * @param fieldsInAppPurchaseAppStoreReviewScreenshots the fields to include for returned resources of type inAppPurchaseAppStoreReviewScreenshots
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseAppStoreReviewScreenshotResponse Single InAppPurchaseAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static inAppPurchasesV2AppStoreReviewScreenshotGetToOneRelated(
        id: string,
        fieldsInAppPurchaseAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'inAppPurchaseV2'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/appStoreReviewScreenshot',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseAppStoreReviewScreenshots]': fieldsInAppPurchaseAppStoreReviewScreenshots,
                'fields[inAppPurchases]': fieldsInAppPurchases,
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
     * @returns InAppPurchaseV2ContentLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasesV2ContentGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchaseV2ContentLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/content',
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
     * @param fieldsInAppPurchaseContents the fields to include for returned resources of type inAppPurchaseContents
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseContentResponse Single InAppPurchaseContent
     * @throws ApiError
     */
    public static inAppPurchasesV2ContentGetToOneRelated(
        id: string,
        fieldsInAppPurchaseContents?: Array<'fileName' | 'fileSize' | 'url' | 'lastModifiedDate' | 'inAppPurchaseV2'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseContentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/content',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseContents]': fieldsInAppPurchaseContents,
                'fields[inAppPurchases]': fieldsInAppPurchases,
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
     * @returns InAppPurchaseV2IapPriceScheduleLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasesV2IapPriceScheduleGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchaseV2IapPriceScheduleLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/iapPriceSchedule',
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
     * @param fieldsInAppPurchasePriceSchedules the fields to include for returned resources of type inAppPurchasePriceSchedules
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsInAppPurchasePrices the fields to include for returned resources of type inAppPurchasePrices
     * @param include comma-separated list of relationships to include
     * @param limitManualPrices maximum number of related manualPrices returned (when they are included)
     * @param limitAutomaticPrices maximum number of related automaticPrices returned (when they are included)
     * @returns InAppPurchasePriceScheduleResponse Single InAppPurchasePriceSchedule
     * @throws ApiError
     */
    public static inAppPurchasesV2IapPriceScheduleGetToOneRelated(
        id: string,
        fieldsInAppPurchasePriceSchedules?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsInAppPurchasePrices?: Array<'startDate' | 'endDate' | 'manual' | 'inAppPurchasePricePoint' | 'territory'>,
        include?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        limitManualPrices?: number,
        limitAutomaticPrices?: number,
    ): CancelablePromise<InAppPurchasePriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/iapPriceSchedule',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchasePriceSchedules]': fieldsInAppPurchasePriceSchedules,
                'fields[territories]': fieldsTerritories,
                'fields[inAppPurchasePrices]': fieldsInAppPurchasePrices,
                'include': include,
                'limit[manualPrices]': limitManualPrices,
                'limit[automaticPrices]': limitAutomaticPrices,
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
     * @returns InAppPurchaseV2ImagesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasesV2ImagesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchaseV2ImagesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/images',
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
     * @param fieldsInAppPurchaseImages the fields to include for returned resources of type inAppPurchaseImages
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseImagesResponse List of InAppPurchaseImages
     * @throws ApiError
     */
    public static inAppPurchasesV2ImagesGetToManyRelated(
        id: string,
        fieldsInAppPurchaseImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'inAppPurchase'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        limit?: number,
        include?: Array<'inAppPurchase'>,
    ): CancelablePromise<InAppPurchaseImagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/images',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseImages]': fieldsInAppPurchaseImages,
                'fields[inAppPurchases]': fieldsInAppPurchases,
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
     * @returns InAppPurchaseV2InAppPurchaseAvailabilityLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasesV2InAppPurchaseAvailabilityGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchaseV2InAppPurchaseAvailabilityLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/inAppPurchaseAvailability',
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
     * @param fieldsInAppPurchaseAvailabilities the fields to include for returned resources of type inAppPurchaseAvailabilities
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param include comma-separated list of relationships to include
     * @param limitAvailableTerritories maximum number of related availableTerritories returned (when they are included)
     * @returns InAppPurchaseAvailabilityResponse Single InAppPurchaseAvailability
     * @throws ApiError
     */
    public static inAppPurchasesV2InAppPurchaseAvailabilityGetToOneRelated(
        id: string,
        fieldsInAppPurchaseAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsTerritories?: Array<'currency'>,
        include?: Array<'availableTerritories'>,
        limitAvailableTerritories?: number,
    ): CancelablePromise<InAppPurchaseAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/inAppPurchaseAvailability',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseAvailabilities]': fieldsInAppPurchaseAvailabilities,
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
     * @returns InAppPurchaseV2InAppPurchaseLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasesV2InAppPurchaseLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchaseV2InAppPurchaseLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/inAppPurchaseLocalizations',
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
     * @param fieldsInAppPurchaseLocalizations the fields to include for returned resources of type inAppPurchaseLocalizations
     * @param fieldsInAppPurchases the fields to include for returned resources of type inAppPurchases
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseLocalizationsResponse List of InAppPurchaseLocalizations
     * @throws ApiError
     */
    public static inAppPurchasesV2InAppPurchaseLocalizationsGetToManyRelated(
        id: string,
        fieldsInAppPurchaseLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'inAppPurchaseV2'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        limit?: number,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/inAppPurchaseLocalizations',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseLocalizations]': fieldsInAppPurchaseLocalizations,
                'fields[inAppPurchases]': fieldsInAppPurchases,
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
     * @returns InAppPurchaseV2PricePointsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasesV2PricePointsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchaseV2PricePointsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/pricePoints',
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
     * @param fieldsInAppPurchasePricePoints the fields to include for returned resources of type inAppPurchasePricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchasePricePointsResponse List of InAppPurchasePricePoints
     * @throws ApiError
     */
    public static inAppPurchasesV2PricePointsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsInAppPurchasePricePoints?: Array<'customerPrice' | 'proceeds' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<InAppPurchasePricePointsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/pricePoints',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[inAppPurchasePricePoints]': fieldsInAppPurchasePricePoints,
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
     * @returns InAppPurchaseV2PromotedPurchaseLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasesV2PromotedPurchaseGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchaseV2PromotedPurchaseLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/relationships/promotedPurchase',
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
    public static inAppPurchasesV2PromotedPurchaseGetToOneRelated(
        id: string,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        fieldsInAppPurchases?: Array<'name' | 'productId' | 'inAppPurchaseType' | 'state' | 'reviewNote' | 'familySharable' | 'contentHosting' | 'inAppPurchaseLocalizations' | 'pricePoints' | 'content' | 'appStoreReviewScreenshot' | 'promotedPurchase' | 'iapPriceSchedule' | 'inAppPurchaseAvailability' | 'images'>,
        fieldsSubscriptions?: Array<'name' | 'productId' | 'familySharable' | 'state' | 'subscriptionPeriod' | 'reviewNote' | 'groupLevel' | 'subscriptionLocalizations' | 'appStoreReviewScreenshot' | 'group' | 'introductoryOffers' | 'promotionalOffers' | 'offerCodes' | 'prices' | 'pricePoints' | 'promotedPurchase' | 'subscriptionAvailability' | 'winBackOffers' | 'images'>,
        include?: Array<'inAppPurchaseV2' | 'subscription'>,
    ): CancelablePromise<PromotedPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/inAppPurchases/{id}/promotedPurchase',
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
}
