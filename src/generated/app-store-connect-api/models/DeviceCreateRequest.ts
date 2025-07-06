/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
export type DeviceCreateRequest = {
    data: {
        type: DeviceCreateRequest.type;
        attributes: {
            name: string;
            platform: BundleIdPlatform;
            udid: string;
        };
    };
};
export namespace DeviceCreateRequest {
    export enum type {
        DEVICES = 'devices',
    }
}

