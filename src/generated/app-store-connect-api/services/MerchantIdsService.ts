/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificatesResponse } from '../models/CertificatesResponse';
import type { MerchantIdCertificatesLinkagesResponse } from '../models/MerchantIdCertificatesLinkagesResponse';
import type { MerchantIdCreateRequest } from '../models/MerchantIdCreateRequest';
import type { MerchantIdResponse } from '../models/MerchantIdResponse';
import type { MerchantIdsResponse } from '../models/MerchantIdsResponse';
import type { MerchantIdUpdateRequest } from '../models/MerchantIdUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MerchantIdsService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterIdentifier filter by attribute 'identifier'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsMerchantIds the fields to include for returned resources of type merchantIds
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @returns MerchantIdsResponse List of MerchantIds
     * @throws ApiError
     */
    public static merchantIdsGetCollection(
        filterName?: Array<string>,
        filterIdentifier?: Array<string>,
        sort?: Array<'name' | '-name' | 'identifier' | '-identifier'>,
        fieldsMerchantIds?: Array<'name' | 'identifier' | 'certificates'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        limit?: number,
        include?: Array<'certificates'>,
        limitCertificates?: number,
    ): CancelablePromise<MerchantIdsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/merchantIds',
            query: {
                'filter[name]': filterName,
                'filter[identifier]': filterIdentifier,
                'sort': sort,
                'fields[merchantIds]': fieldsMerchantIds,
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
     * @param requestBody MerchantId representation
     * @returns MerchantIdResponse Single MerchantId
     * @throws ApiError
     */
    public static merchantIdsCreateInstance(
        requestBody: MerchantIdCreateRequest,
    ): CancelablePromise<MerchantIdResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/merchantIds',
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
     * @param fieldsMerchantIds the fields to include for returned resources of type merchantIds
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @returns MerchantIdResponse Single MerchantId
     * @throws ApiError
     */
    public static merchantIdsGetInstance(
        id: string,
        fieldsMerchantIds?: Array<'name' | 'identifier' | 'certificates'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        include?: Array<'certificates'>,
        limitCertificates?: number,
    ): CancelablePromise<MerchantIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/merchantIds/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[merchantIds]': fieldsMerchantIds,
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
     * @param requestBody MerchantId representation
     * @returns MerchantIdResponse Single MerchantId
     * @throws ApiError
     */
    public static merchantIdsUpdateInstance(
        id: string,
        requestBody: MerchantIdUpdateRequest,
    ): CancelablePromise<MerchantIdResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/merchantIds/{id}',
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
    public static merchantIdsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/merchantIds/{id}',
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
     * @returns MerchantIdCertificatesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static merchantIdsCertificatesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<MerchantIdCertificatesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/merchantIds/{id}/relationships/certificates',
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
    public static merchantIdsCertificatesGetToManyRelated(
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
            url: '/v1/merchantIds/{id}/certificates',
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
