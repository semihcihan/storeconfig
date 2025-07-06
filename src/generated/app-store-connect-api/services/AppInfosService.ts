/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRatingDeclarationResponse } from '../models/AgeRatingDeclarationResponse';
import type { AppCategoryResponse } from '../models/AppCategoryResponse';
import type { AppInfoAgeRatingDeclarationLinkageResponse } from '../models/AppInfoAgeRatingDeclarationLinkageResponse';
import type { AppInfoAppInfoLocalizationsLinkagesResponse } from '../models/AppInfoAppInfoLocalizationsLinkagesResponse';
import type { AppInfoLocalizationsResponse } from '../models/AppInfoLocalizationsResponse';
import type { AppInfoPrimaryCategoryLinkageResponse } from '../models/AppInfoPrimaryCategoryLinkageResponse';
import type { AppInfoPrimarySubcategoryOneLinkageResponse } from '../models/AppInfoPrimarySubcategoryOneLinkageResponse';
import type { AppInfoPrimarySubcategoryTwoLinkageResponse } from '../models/AppInfoPrimarySubcategoryTwoLinkageResponse';
import type { AppInfoResponse } from '../models/AppInfoResponse';
import type { AppInfoSecondaryCategoryLinkageResponse } from '../models/AppInfoSecondaryCategoryLinkageResponse';
import type { AppInfoSecondarySubcategoryOneLinkageResponse } from '../models/AppInfoSecondarySubcategoryOneLinkageResponse';
import type { AppInfoSecondarySubcategoryTwoLinkageResponse } from '../models/AppInfoSecondarySubcategoryTwoLinkageResponse';
import type { AppInfoUpdateRequest } from '../models/AppInfoUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppInfosService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAppInfos the fields to include for returned resources of type appInfos
     * @param fieldsAgeRatingDeclarations the fields to include for returned resources of type ageRatingDeclarations
     * @param fieldsAppInfoLocalizations the fields to include for returned resources of type appInfoLocalizations
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitAppInfoLocalizations maximum number of related appInfoLocalizations returned (when they are included)
     * @returns AppInfoResponse Single AppInfo
     * @throws ApiError
     */
    public static appInfosGetInstance(
        id: string,
        fieldsAppInfos?: Array<'appStoreState' | 'state' | 'appStoreAgeRating' | 'australiaAgeRating' | 'brazilAgeRating' | 'brazilAgeRatingV2' | 'franceAgeRating' | 'koreaAgeRating' | 'kidsAgeBand' | 'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        fieldsAgeRatingDeclarations?: Array<'alcoholTobaccoOrDrugUseOrReferences' | 'contests' | 'gambling' | 'gamblingSimulated' | 'kidsAgeBand' | 'lootBox' | 'medicalOrTreatmentInformation' | 'profanityOrCrudeHumor' | 'sexualContentGraphicAndNudity' | 'sexualContentOrNudity' | 'horrorOrFearThemes' | 'matureOrSuggestiveThemes' | 'unrestrictedWebAccess' | 'violenceCartoonOrFantasy' | 'violenceRealisticProlongedGraphicOrSadistic' | 'violenceRealistic' | 'koreaAgeRatingOverride'>,
        fieldsAppInfoLocalizations?: Array<'locale' | 'name' | 'subtitle' | 'privacyPolicyUrl' | 'privacyChoicesUrl' | 'privacyPolicyText' | 'appInfo'>,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        limitAppInfoLocalizations?: number,
    ): CancelablePromise<AppInfoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appInfos]': fieldsAppInfos,
                'fields[ageRatingDeclarations]': fieldsAgeRatingDeclarations,
                'fields[appInfoLocalizations]': fieldsAppInfoLocalizations,
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[appInfoLocalizations]': limitAppInfoLocalizations,
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
     * @param requestBody AppInfo representation
     * @returns AppInfoResponse Single AppInfo
     * @throws ApiError
     */
    public static appInfosUpdateInstance(
        id: string,
        requestBody: AppInfoUpdateRequest,
    ): CancelablePromise<AppInfoResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appInfos/{id}',
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
     * @returns AppInfoAgeRatingDeclarationLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosAgeRatingDeclarationGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoAgeRatingDeclarationLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/ageRatingDeclaration',
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
     * @param fieldsAgeRatingDeclarations the fields to include for returned resources of type ageRatingDeclarations
     * @returns AgeRatingDeclarationResponse Single AgeRatingDeclaration
     * @throws ApiError
     */
    public static appInfosAgeRatingDeclarationGetToOneRelated(
        id: string,
        fieldsAgeRatingDeclarations?: Array<'alcoholTobaccoOrDrugUseOrReferences' | 'contests' | 'gambling' | 'gamblingSimulated' | 'kidsAgeBand' | 'lootBox' | 'medicalOrTreatmentInformation' | 'profanityOrCrudeHumor' | 'sexualContentGraphicAndNudity' | 'sexualContentOrNudity' | 'horrorOrFearThemes' | 'matureOrSuggestiveThemes' | 'unrestrictedWebAccess' | 'violenceCartoonOrFantasy' | 'violenceRealisticProlongedGraphicOrSadistic' | 'violenceRealistic' | 'koreaAgeRatingOverride'>,
    ): CancelablePromise<AgeRatingDeclarationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/ageRatingDeclaration',
            path: {
                'id': id,
            },
            query: {
                'fields[ageRatingDeclarations]': fieldsAgeRatingDeclarations,
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
     * @returns AppInfoAppInfoLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appInfosAppInfoLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppInfoAppInfoLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/appInfoLocalizations',
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
     * @param filterLocale filter by attribute 'locale'
     * @param fieldsAppInfoLocalizations the fields to include for returned resources of type appInfoLocalizations
     * @param fieldsAppInfos the fields to include for returned resources of type appInfos
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppInfoLocalizationsResponse List of AppInfoLocalizations
     * @throws ApiError
     */
    public static appInfosAppInfoLocalizationsGetToManyRelated(
        id: string,
        filterLocale?: Array<string>,
        fieldsAppInfoLocalizations?: Array<'locale' | 'name' | 'subtitle' | 'privacyPolicyUrl' | 'privacyChoicesUrl' | 'privacyPolicyText' | 'appInfo'>,
        fieldsAppInfos?: Array<'appStoreState' | 'state' | 'appStoreAgeRating' | 'australiaAgeRating' | 'brazilAgeRating' | 'brazilAgeRatingV2' | 'franceAgeRating' | 'koreaAgeRating' | 'kidsAgeBand' | 'app' | 'ageRatingDeclaration' | 'appInfoLocalizations' | 'primaryCategory' | 'primarySubcategoryOne' | 'primarySubcategoryTwo' | 'secondaryCategory' | 'secondarySubcategoryOne' | 'secondarySubcategoryTwo'>,
        limit?: number,
        include?: Array<'appInfo'>,
    ): CancelablePromise<AppInfoLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/appInfoLocalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[locale]': filterLocale,
                'fields[appInfoLocalizations]': fieldsAppInfoLocalizations,
                'fields[appInfos]': fieldsAppInfos,
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
     * @returns AppInfoPrimaryCategoryLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosPrimaryCategoryGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoPrimaryCategoryLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/primaryCategory',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosPrimaryCategoryGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/primaryCategory',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @returns AppInfoPrimarySubcategoryOneLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosPrimarySubcategoryOneGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoPrimarySubcategoryOneLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/primarySubcategoryOne',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosPrimarySubcategoryOneGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/primarySubcategoryOne',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @returns AppInfoPrimarySubcategoryTwoLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosPrimarySubcategoryTwoGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoPrimarySubcategoryTwoLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/primarySubcategoryTwo',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosPrimarySubcategoryTwoGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/primarySubcategoryTwo',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @returns AppInfoSecondaryCategoryLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosSecondaryCategoryGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoSecondaryCategoryLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/secondaryCategory',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosSecondaryCategoryGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/secondaryCategory',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @returns AppInfoSecondarySubcategoryOneLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosSecondarySubcategoryOneGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoSecondarySubcategoryOneLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/secondarySubcategoryOne',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosSecondarySubcategoryOneGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/secondarySubcategoryOne',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @returns AppInfoSecondarySubcategoryTwoLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appInfosSecondarySubcategoryTwoGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppInfoSecondarySubcategoryTwoLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/relationships/secondarySubcategoryTwo',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appInfosSecondarySubcategoryTwoGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfos/{id}/secondarySubcategoryTwo',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
