/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificatesResponse } from '../models/CertificatesResponse';
import type { PassTypeIdCertificatesLinkagesResponse } from '../models/PassTypeIdCertificatesLinkagesResponse';
import type { PassTypeIdCreateRequest } from '../models/PassTypeIdCreateRequest';
import type { PassTypeIdResponse } from '../models/PassTypeIdResponse';
import type { PassTypeIdsResponse } from '../models/PassTypeIdsResponse';
import type { PassTypeIdUpdateRequest } from '../models/PassTypeIdUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PassTypeIdsService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterIdentifier filter by attribute 'identifier'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsPassTypeIds the fields to include for returned resources of type passTypeIds
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @returns PassTypeIdsResponse List of PassTypeIds
     * @throws ApiError
     */
    public static passTypeIdsGetCollection(
        filterName?: Array<string>,
        filterIdentifier?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'name' | '-name' | 'identifier' | '-identifier' | 'id' | '-id'>,
        fieldsPassTypeIds?: Array<'name' | 'identifier' | 'certificates'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        limit?: number,
        include?: Array<'certificates'>,
        limitCertificates?: number,
    ): CancelablePromise<PassTypeIdsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/passTypeIds',
            query: {
                'filter[name]': filterName,
                'filter[identifier]': filterIdentifier,
                'filter[id]': filterId,
                'sort': sort,
                'fields[passTypeIds]': fieldsPassTypeIds,
                'fields[certificates]': fieldsCertificates,
                'limit': limit,
                'include': include,
                'limit[certificates]': limitCertificates,
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
     * @param requestBody PassTypeId representation
     * @returns PassTypeIdResponse Single PassTypeId
     * @throws ApiError
     */
    public static passTypeIdsCreateInstance(
        requestBody: PassTypeIdCreateRequest,
    ): CancelablePromise<PassTypeIdResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/passTypeIds',
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
     * @param fieldsPassTypeIds the fields to include for returned resources of type passTypeIds
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @returns PassTypeIdResponse Single PassTypeId
     * @throws ApiError
     */
    public static passTypeIdsGetInstance(
        id: string,
        fieldsPassTypeIds?: Array<'name' | 'identifier' | 'certificates'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        include?: Array<'certificates'>,
        limitCertificates?: number,
    ): CancelablePromise<PassTypeIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/passTypeIds/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[passTypeIds]': fieldsPassTypeIds,
                'fields[certificates]': fieldsCertificates,
                'include': include,
                'limit[certificates]': limitCertificates,
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
     * @param requestBody PassTypeId representation
     * @returns PassTypeIdResponse Single PassTypeId
     * @throws ApiError
     */
    public static passTypeIdsUpdateInstance(
        id: string,
        requestBody: PassTypeIdUpdateRequest,
    ): CancelablePromise<PassTypeIdResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/passTypeIds/{id}',
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
    public static passTypeIdsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/passTypeIds/{id}',
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
     * @returns PassTypeIdCertificatesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static passTypeIdsCertificatesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<PassTypeIdCertificatesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/passTypeIds/{id}/relationships/certificates',
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
     * @param filterDisplayName filter by attribute 'displayName'
     * @param filterCertificateType filter by attribute 'certificateType'
     * @param filterSerialNumber filter by attribute 'serialNumber'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param fieldsPassTypeIds the fields to include for returned resources of type passTypeIds
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns CertificatesResponse List of Certificates
     * @throws ApiError
     */
    public static passTypeIdsCertificatesGetToManyRelated(
        id: string,
        filterDisplayName?: Array<string>,
        filterCertificateType?: Array<'APPLE_PAY' | 'APPLE_PAY_MERCHANT_IDENTITY' | 'APPLE_PAY_PSP_IDENTITY' | 'APPLE_PAY_RSA' | 'DEVELOPER_ID_KEXT' | 'DEVELOPER_ID_KEXT_G2' | 'DEVELOPER_ID_APPLICATION' | 'DEVELOPER_ID_APPLICATION_G2' | 'DEVELOPMENT' | 'DISTRIBUTION' | 'IDENTITY_ACCESS' | 'IOS_DEVELOPMENT' | 'IOS_DISTRIBUTION' | 'MAC_APP_DISTRIBUTION' | 'MAC_INSTALLER_DISTRIBUTION' | 'MAC_APP_DEVELOPMENT' | 'PASS_TYPE_ID' | 'PASS_TYPE_ID_WITH_NFC'>,
        filterSerialNumber?: Array<string>,
        filterId?: Array<string>,
        sort?: Array<'displayName' | '-displayName' | 'certificateType' | '-certificateType' | 'serialNumber' | '-serialNumber' | 'id' | '-id'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        fieldsPassTypeIds?: Array<'name' | 'identifier' | 'certificates'>,
        limit?: number,
        include?: Array<'passTypeId'>,
    ): CancelablePromise<CertificatesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/passTypeIds/{id}/certificates',
            path: {
                'id': id,
            },
            query: {
                'filter[displayName]': filterDisplayName,
                'filter[certificateType]': filterCertificateType,
                'filter[serialNumber]': filterSerialNumber,
                'filter[id]': filterId,
                'sort': sort,
                'fields[certificates]': fieldsCertificates,
                'fields[passTypeIds]': fieldsPassTypeIds,
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
}
