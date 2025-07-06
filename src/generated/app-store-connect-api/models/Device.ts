/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
import type { ResourceLinks } from './ResourceLinks';
export type Device = {
    type: Device.type;
    id: string;
    attributes?: {
        name?: string;
        platform?: BundleIdPlatform;
        udid?: string;
        deviceClass?: Device.deviceClass;
        status?: Device.status;
        model?: string;
        addedDate?: string;
    };
    links?: ResourceLinks;
};
export namespace Device {
    export enum type {
        DEVICES = 'devices',
    }
    export enum deviceClass {
        APPLE_VISION_PRO = 'APPLE_VISION_PRO',
        APPLE_WATCH = 'APPLE_WATCH',
        IPAD = 'IPAD',
        IPHONE = 'IPHONE',
        IPOD = 'IPOD',
        APPLE_TV = 'APPLE_TV',
        MAC = 'MAC',
    }
    export enum status {
        ENABLED = 'ENABLED',
        DISABLED = 'DISABLED',
    }
}

