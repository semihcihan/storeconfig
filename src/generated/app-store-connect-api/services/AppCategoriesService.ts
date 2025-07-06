/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCategoriesResponse } from '../models/AppCategoriesResponse';
import type { AppCategoriesWithoutIncludesResponse } from '../models/AppCategoriesWithoutIncludesResponse';
import type { AppCategoryParentLinkageResponse } from '../models/AppCategoryParentLinkageResponse';
import type { AppCategoryResponse } from '../models/AppCategoryResponse';
import type { AppCategorySubcategoriesLinkagesResponse } from '../models/AppCategorySubcategoriesLinkagesResponse';
import type { AppCategoryWithoutIncludesResponse } from '../models/AppCategoryWithoutIncludesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppCategoriesService {
    /**
     * @param filterPlatforms filter by attribute 'platforms'
     * @param existsParent filter by existence or non-existence of related 'parent'
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoriesResponse List of AppCategories
     * @throws ApiError
     */
    public static appCategoriesGetCollection(
        filterPlatforms?: Array<'IOS' | 'MAC_OS' | 'TV_OS' | 'VISION_OS'>,
        existsParent?: boolean,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        limit?: number,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories',
            query: {
                'filter[platforms]': filterPlatforms,
                'exists[parent]': existsParent,
                'fields[appCategories]': fieldsAppCategories,
                'limit': limit,
                'include': include,
                'limit[subcategories]': limitSubcategories,
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param include comma-separated list of relationships to include
     * @param limitSubcategories maximum number of related subcategories returned (when they are included)
     * @returns AppCategoryResponse Single AppCategory
     * @throws ApiError
     */
    public static appCategoriesGetInstance(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        include?: Array<'subcategories' | 'parent'>,
        limitSubcategories?: number,
    ): CancelablePromise<AppCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories/{id}',
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
     * @returns AppCategoryParentLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appCategoriesParentGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppCategoryParentLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories/{id}/relationships/parent',
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
     * @returns AppCategoryWithoutIncludesResponse Single AppCategory with get
     * @throws ApiError
     */
    public static appCategoriesParentGetToOneRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
    ): CancelablePromise<AppCategoryWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories/{id}/parent',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
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
     * @returns AppCategorySubcategoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appCategoriesSubcategoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppCategorySubcategoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories/{id}/relationships/subcategories',
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
     * @param fieldsAppCategories the fields to include for returned resources of type appCategories
     * @param limit maximum resources per page
     * @returns AppCategoriesWithoutIncludesResponse List of AppCategories with get
     * @throws ApiError
     */
    public static appCategoriesSubcategoriesGetToManyRelated(
        id: string,
        fieldsAppCategories?: Array<'platforms' | 'subcategories' | 'parent'>,
        limit?: number,
    ): CancelablePromise<AppCategoriesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCategories/{id}/subcategories',
            path: {
                'id': id,
            },
            query: {
                'fields[appCategories]': fieldsAppCategories,
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
