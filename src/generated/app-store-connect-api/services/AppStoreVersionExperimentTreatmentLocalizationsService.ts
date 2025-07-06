/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSetsResponse } from '../models/AppPreviewSetsResponse';
import type { AppScreenshotSetsResponse } from '../models/AppScreenshotSetsResponse';
import type { AppStoreVersionExperimentTreatmentLocalizationAppPreviewSetsLinkagesResponse } from '../models/AppStoreVersionExperimentTreatmentLocalizationAppPreviewSetsLinkagesResponse';
import type { AppStoreVersionExperimentTreatmentLocalizationAppScreenshotSetsLinkagesResponse } from '../models/AppStoreVersionExperimentTreatmentLocalizationAppScreenshotSetsLinkagesResponse';
import type { AppStoreVersionExperimentTreatmentLocalizationCreateRequest } from '../models/AppStoreVersionExperimentTreatmentLocalizationCreateRequest';
import type { AppStoreVersionExperimentTreatmentLocalizationResponse } from '../models/AppStoreVersionExperimentTreatmentLocalizationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionExperimentTreatmentLocalizationsService {
    /**
     * @param requestBody AppStoreVersionExperimentTreatmentLocalization representation
     * @returns AppStoreVersionExperimentTreatmentLocalizationResponse Single AppStoreVersionExperimentTreatmentLocalization
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsCreateInstance(
        requestBody: AppStoreVersionExperimentTreatmentLocalizationCreateRequest,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations',
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
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param include comma-separated list of relationships to include
     * @param limitAppPreviewSets maximum number of related appPreviewSets returned (when they are included)
     * @param limitAppScreenshotSets maximum number of related appScreenshotSets returned (when they are included)
     * @returns AppStoreVersionExperimentTreatmentLocalizationResponse Single AppStoreVersionExperimentTreatmentLocalization
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsGetInstance(
        id: string,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        include?: Array<'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        limitAppPreviewSets?: number,
        limitAppScreenshotSets?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
                'fields[appPreviewSets]': fieldsAppPreviewSets,
                'include': include,
                'limit[appPreviewSets]': limitAppPreviewSets,
                'limit[appScreenshotSets]': limitAppScreenshotSets,
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
    public static appStoreVersionExperimentTreatmentLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}',
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
     * @returns AppStoreVersionExperimentTreatmentLocalizationAppPreviewSetsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsAppPreviewSetsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentLocalizationAppPreviewSetsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}/relationships/appPreviewSets',
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
     * @param filterPreviewType filter by attribute 'previewType'
     * @param filterAppStoreVersionLocalization filter by id(s) of related 'appStoreVersionLocalization'
     * @param filterAppCustomProductPageLocalization filter by id(s) of related 'appCustomProductPageLocalization'
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param fieldsAppStoreVersionLocalizations the fields to include for returned resources of type appStoreVersionLocalizations
     * @param fieldsAppCustomProductPageLocalizations the fields to include for returned resources of type appCustomProductPageLocalizations
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param fieldsAppPreviews the fields to include for returned resources of type appPreviews
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppPreviews maximum number of related appPreviews returned (when they are included)
     * @returns AppPreviewSetsResponse List of AppPreviewSets
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsAppPreviewSetsGetToManyRelated(
        id: string,
        filterPreviewType?: Array<'IPHONE_67' | 'IPHONE_61' | 'IPHONE_65' | 'IPHONE_58' | 'IPHONE_55' | 'IPHONE_47' | 'IPHONE_40' | 'IPHONE_35' | 'IPAD_PRO_3GEN_129' | 'IPAD_PRO_3GEN_11' | 'IPAD_PRO_129' | 'IPAD_105' | 'IPAD_97' | 'DESKTOP' | 'APPLE_TV' | 'APPLE_VISION_PRO'>,
        filterAppStoreVersionLocalization?: Array<string>,
        filterAppCustomProductPageLocalization?: Array<string>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        fieldsAppStoreVersionLocalizations?: Array<'description' | 'locale' | 'keywords' | 'marketingUrl' | 'promotionalText' | 'supportUrl' | 'whatsNew' | 'appStoreVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppCustomProductPageLocalizations?: Array<'locale' | 'promotionalText' | 'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppPreviews?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'previewFrameTimeCode' | 'mimeType' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appPreviewSet'>,
        limit?: number,
        include?: Array<'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limitAppPreviews?: number,
    ): CancelablePromise<AppPreviewSetsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}/appPreviewSets',
            path: {
                'id': id,
            },
            query: {
                'filter[previewType]': filterPreviewType,
                'filter[appStoreVersionLocalization]': filterAppStoreVersionLocalization,
                'filter[appCustomProductPageLocalization]': filterAppCustomProductPageLocalization,
                'fields[appPreviewSets]': fieldsAppPreviewSets,
                'fields[appStoreVersionLocalizations]': fieldsAppStoreVersionLocalizations,
                'fields[appCustomProductPageLocalizations]': fieldsAppCustomProductPageLocalizations,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'fields[appPreviews]': fieldsAppPreviews,
                'limit': limit,
                'include': include,
                'limit[appPreviews]': limitAppPreviews,
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
     * @returns AppStoreVersionExperimentTreatmentLocalizationAppScreenshotSetsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsAppScreenshotSetsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentLocalizationAppScreenshotSetsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}/relationships/appScreenshotSets',
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
     * @param filterScreenshotDisplayType filter by attribute 'screenshotDisplayType'
     * @param filterAppStoreVersionLocalization filter by id(s) of related 'appStoreVersionLocalization'
     * @param filterAppCustomProductPageLocalization filter by id(s) of related 'appCustomProductPageLocalization'
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppStoreVersionLocalizations the fields to include for returned resources of type appStoreVersionLocalizations
     * @param fieldsAppCustomProductPageLocalizations the fields to include for returned resources of type appCustomProductPageLocalizations
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param fieldsAppScreenshots the fields to include for returned resources of type appScreenshots
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppScreenshots maximum number of related appScreenshots returned (when they are included)
     * @returns AppScreenshotSetsResponse List of AppScreenshotSets
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentLocalizationsAppScreenshotSetsGetToManyRelated(
        id: string,
        filterScreenshotDisplayType?: Array<'APP_IPHONE_67' | 'APP_IPHONE_61' | 'APP_IPHONE_65' | 'APP_IPHONE_58' | 'APP_IPHONE_55' | 'APP_IPHONE_47' | 'APP_IPHONE_40' | 'APP_IPHONE_35' | 'APP_IPAD_PRO_3GEN_129' | 'APP_IPAD_PRO_3GEN_11' | 'APP_IPAD_PRO_129' | 'APP_IPAD_105' | 'APP_IPAD_97' | 'APP_DESKTOP' | 'APP_WATCH_ULTRA' | 'APP_WATCH_SERIES_10' | 'APP_WATCH_SERIES_7' | 'APP_WATCH_SERIES_4' | 'APP_WATCH_SERIES_3' | 'APP_APPLE_TV' | 'APP_APPLE_VISION_PRO' | 'IMESSAGE_APP_IPHONE_67' | 'IMESSAGE_APP_IPHONE_61' | 'IMESSAGE_APP_IPHONE_65' | 'IMESSAGE_APP_IPHONE_58' | 'IMESSAGE_APP_IPHONE_55' | 'IMESSAGE_APP_IPHONE_47' | 'IMESSAGE_APP_IPHONE_40' | 'IMESSAGE_APP_IPAD_PRO_3GEN_129' | 'IMESSAGE_APP_IPAD_PRO_3GEN_11' | 'IMESSAGE_APP_IPAD_PRO_129' | 'IMESSAGE_APP_IPAD_105' | 'IMESSAGE_APP_IPAD_97'>,
        filterAppStoreVersionLocalization?: Array<string>,
        filterAppCustomProductPageLocalization?: Array<string>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppStoreVersionLocalizations?: Array<'description' | 'locale' | 'keywords' | 'marketingUrl' | 'promotionalText' | 'supportUrl' | 'whatsNew' | 'appStoreVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppCustomProductPageLocalizations?: Array<'locale' | 'promotionalText' | 'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'appScreenshotSet'>,
        limit?: number,
        include?: Array<'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        limitAppScreenshots?: number,
    ): CancelablePromise<AppScreenshotSetsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatmentLocalizations/{id}/appScreenshotSets',
            path: {
                'id': id,
            },
            query: {
                'filter[screenshotDisplayType]': filterScreenshotDisplayType,
                'filter[appStoreVersionLocalization]': filterAppStoreVersionLocalization,
                'filter[appCustomProductPageLocalization]': filterAppCustomProductPageLocalization,
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
                'fields[appStoreVersionLocalizations]': fieldsAppStoreVersionLocalizations,
                'fields[appCustomProductPageLocalizations]': fieldsAppCustomProductPageLocalizations,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'fields[appScreenshots]': fieldsAppScreenshots,
                'limit': limit,
                'include': include,
                'limit[appScreenshots]': limitAppScreenshots,
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
