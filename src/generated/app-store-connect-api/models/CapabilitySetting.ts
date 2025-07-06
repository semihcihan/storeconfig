/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CapabilityOption } from './CapabilityOption';
export type CapabilitySetting = {
    key?: CapabilitySetting.key;
    name?: string;
    description?: string;
    enabledByDefault?: boolean;
    visible?: boolean;
    allowedInstances?: CapabilitySetting.allowedInstances;
    minInstances?: number;
    options?: Array<CapabilityOption>;
};
export namespace CapabilitySetting {
    export enum key {
        ICLOUD_VERSION = 'ICLOUD_VERSION',
        DATA_PROTECTION_PERMISSION_LEVEL = 'DATA_PROTECTION_PERMISSION_LEVEL',
        APPLE_ID_AUTH_APP_CONSENT = 'APPLE_ID_AUTH_APP_CONSENT',
    }
    export enum allowedInstances {
        ENTRY = 'ENTRY',
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
    }
}

