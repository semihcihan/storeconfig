/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdWithoutIncludesResponse } from '../models/BundleIdWithoutIncludesResponse';
import type { CertificatesWithoutIncludesResponse } from '../models/CertificatesWithoutIncludesResponse';
import type { DevicesWithoutIncludesResponse } from '../models/DevicesWithoutIncludesResponse';
import type { ProfileBundleIdLinkageResponse } from '../models/ProfileBundleIdLinkageResponse';
import type { ProfileCertificatesLinkagesResponse } from '../models/ProfileCertificatesLinkagesResponse';
import type { ProfileCreateRequest } from '../models/ProfileCreateRequest';
import type { ProfileDevicesLinkagesResponse } from '../models/ProfileDevicesLinkagesResponse';
import type { ProfileResponse } from '../models/ProfileResponse';
import type { ProfilesResponse } from '../models/ProfilesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProfilesService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterProfileType filter by attribute 'profileType'
     * @param filterProfileState filter by attribute 'profileState'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsProfiles the fields to include for returned resources of type profiles
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @param fieldsDevices the fields to include for returned resources of type devices
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @param limitDevices maximum number of related devices returned (when they are included)
     * @returns ProfilesResponse List of Profiles
     * @throws ApiError
     */
    public static profilesGetCollection(
        filterName?: Array<string>,
        filterProfileType?: Array<'IOS_APP_DEVELOPMENT' | 'IOS_APP_STORE' | 'IOS_APP_ADHOC' | 'IOS_APP_INHOUSE' | 'MAC_APP_DEVELOPMENT' | 'MAC_APP_STORE' | 'MAC_APP_DIRECT' | 'TVOS_APP_DEVELOPMENT' | 'TVOS_APP_STORE' | 'TVOS_APP_ADHOC' | 'TVOS_APP_INHOUSE' | 'MAC_CATALYST_APP_DEVELOPMENT' | 'MAC_CATALYST_APP_STORE' | 'MAC_CATALYST_APP_DIRECT'>,
        filterProfileState?: Array<'ACTIVE' | 'INVALID'>,
        filterId?: Array<string>,
        sort?: Array<'name' | '-name' | 'profileType' | '-profileType' | 'profileState' | '-profileState' | 'id' | '-id'>,
        fieldsProfiles?: Array<'name' | 'platform' | 'profileType' | 'profileState' | 'profileContent' | 'uuid' | 'createdDate' | 'expirationDate' | 'bundleId' | 'devices' | 'certificates'>,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
        fieldsDevices?: Array<'name' | 'platform' | 'udid' | 'deviceClass' | 'status' | 'model' | 'addedDate'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        limit?: number,
        include?: Array<'bundleId' | 'devices' | 'certificates'>,
        limitCertificates?: number,
        limitDevices?: number,
    ): CancelablePromise<ProfilesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles',
            query: {
                'filter[name]': filterName,
                'filter[profileType]': filterProfileType,
                'filter[profileState]': filterProfileState,
                'filter[id]': filterId,
                'sort': sort,
                'fields[profiles]': fieldsProfiles,
                'fields[bundleIds]': fieldsBundleIds,
                'fields[devices]': fieldsDevices,
                'fields[certificates]': fieldsCertificates,
                'limit': limit,
                'include': include,
                'limit[certificates]': limitCertificates,
                'limit[devices]': limitDevices,
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
     * @param requestBody Profile representation
     * @returns ProfileResponse Single Profile
     * @throws ApiError
     */
    public static profilesCreateInstance(
        requestBody: ProfileCreateRequest,
    ): CancelablePromise<ProfileResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/profiles',
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
     * @param fieldsProfiles the fields to include for returned resources of type profiles
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @param fieldsDevices the fields to include for returned resources of type devices
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param include comma-separated list of relationships to include
     * @param limitCertificates maximum number of related certificates returned (when they are included)
     * @param limitDevices maximum number of related devices returned (when they are included)
     * @returns ProfileResponse Single Profile
     * @throws ApiError
     */
    public static profilesGetInstance(
        id: string,
        fieldsProfiles?: Array<'name' | 'platform' | 'profileType' | 'profileState' | 'profileContent' | 'uuid' | 'createdDate' | 'expirationDate' | 'bundleId' | 'devices' | 'certificates'>,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
        fieldsDevices?: Array<'name' | 'platform' | 'udid' | 'deviceClass' | 'status' | 'model' | 'addedDate'>,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        include?: Array<'bundleId' | 'devices' | 'certificates'>,
        limitCertificates?: number,
        limitDevices?: number,
    ): CancelablePromise<ProfileResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[profiles]': fieldsProfiles,
                'fields[bundleIds]': fieldsBundleIds,
                'fields[devices]': fieldsDevices,
                'fields[certificates]': fieldsCertificates,
                'include': include,
                'limit[certificates]': limitCertificates,
                'limit[devices]': limitDevices,
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
    public static profilesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/profiles/{id}',
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
     * @returns ProfileBundleIdLinkageResponse Related linkage
     * @throws ApiError
     */
    public static profilesBundleIdGetToOneRelationship(
        id: string,
    ): CancelablePromise<ProfileBundleIdLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/relationships/bundleId',
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
     * @param fieldsBundleIds the fields to include for returned resources of type bundleIds
     * @returns BundleIdWithoutIncludesResponse Single BundleId with get
     * @throws ApiError
     */
    public static profilesBundleIdGetToOneRelated(
        id: string,
        fieldsBundleIds?: Array<'name' | 'platform' | 'identifier' | 'seedId' | 'profiles' | 'bundleIdCapabilities' | 'app'>,
    ): CancelablePromise<BundleIdWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/bundleId',
            path: {
                'id': id,
            },
            query: {
                'fields[bundleIds]': fieldsBundleIds,
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
     * @returns ProfileCertificatesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static profilesCertificatesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ProfileCertificatesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/relationships/certificates',
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
     * @param fieldsCertificates the fields to include for returned resources of type certificates
     * @param limit maximum resources per page
     * @returns CertificatesWithoutIncludesResponse List of Certificates with get
     * @throws ApiError
     */
    public static profilesCertificatesGetToManyRelated(
        id: string,
        fieldsCertificates?: Array<'name' | 'certificateType' | 'displayName' | 'serialNumber' | 'platform' | 'expirationDate' | 'certificateContent' | 'activated' | 'passTypeId'>,
        limit?: number,
    ): CancelablePromise<CertificatesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/certificates',
            path: {
                'id': id,
            },
            query: {
                'fields[certificates]': fieldsCertificates,
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
     * @returns ProfileDevicesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static profilesDevicesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<ProfileDevicesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/relationships/devices',
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
     * @param fieldsDevices the fields to include for returned resources of type devices
     * @param limit maximum resources per page
     * @returns DevicesWithoutIncludesResponse List of Devices with get
     * @throws ApiError
     */
    public static profilesDevicesGetToManyRelated(
        id: string,
        fieldsDevices?: Array<'name' | 'platform' | 'udid' | 'deviceClass' | 'status' | 'model' | 'addedDate'>,
        limit?: number,
    ): CancelablePromise<DevicesWithoutIncludesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profiles/{id}/devices',
            path: {
                'id': id,
            },
            query: {
                'fields[devices]': fieldsDevices,
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
