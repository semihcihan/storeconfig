/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceCreateRequest } from '../models/DeviceCreateRequest';
import type { DeviceResponse } from '../models/DeviceResponse';
import type { DevicesResponse } from '../models/DevicesResponse';
import type { DeviceUpdateRequest } from '../models/DeviceUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DevicesService {
    /**
     * @param filterName filter by attribute 'name'
     * @param filterPlatform filter by attribute 'platform'
     * @param filterUdid filter by attribute 'udid'
     * @param filterStatus filter by attribute 'status'
     * @param filterId filter by id(s)
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsDevices the fields to include for returned resources of type devices
     * @param limit maximum resources per page
     * @returns DevicesResponse List of Devices
     * @throws ApiError
     */
    public static devicesGetCollection(
        filterName?: Array<string>,
        filterPlatform?: Array<'IOS' | 'MAC_OS' | 'UNIVERSAL'>,
        filterUdid?: Array<string>,
        filterStatus?: Array<'ENABLED' | 'DISABLED'>,
        filterId?: Array<string>,
        sort?: Array<'name' | '-name' | 'platform' | '-platform' | 'udid' | '-udid' | 'status' | '-status' | 'id' | '-id'>,
        fieldsDevices?: Array<'name' | 'platform' | 'udid' | 'deviceClass' | 'status' | 'model' | 'addedDate'>,
        limit?: number,
    ): CancelablePromise<DevicesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/devices',
            query: {
                'filter[name]': filterName,
                'filter[platform]': filterPlatform,
                'filter[udid]': filterUdid,
                'filter[status]': filterStatus,
                'filter[id]': filterId,
                'sort': sort,
                'fields[devices]': fieldsDevices,
                'limit': limit,
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
     * @param requestBody Device representation
     * @returns DeviceResponse Single Device
     * @throws ApiError
     */
    public static devicesCreateInstance(
        requestBody: DeviceCreateRequest,
    ): CancelablePromise<DeviceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/devices',
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
     * @param fieldsDevices the fields to include for returned resources of type devices
     * @returns DeviceResponse Single Device
     * @throws ApiError
     */
    public static devicesGetInstance(
        id: string,
        fieldsDevices?: Array<'name' | 'platform' | 'udid' | 'deviceClass' | 'status' | 'model' | 'addedDate'>,
    ): CancelablePromise<DeviceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/devices/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[devices]': fieldsDevices,
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
     * @param requestBody Device representation
     * @returns DeviceResponse Single Device
     * @throws ApiError
     */
    public static devicesUpdateInstance(
        id: string,
        requestBody: DeviceUpdateRequest,
    ): CancelablePromise<DeviceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/devices/{id}',
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
}
