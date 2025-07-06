/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CapabilitySetting } from './CapabilitySetting';
import type { CapabilityType } from './CapabilityType';
export type BundleIdCapabilityUpdateRequest = {
    data: {
        type: BundleIdCapabilityUpdateRequest.type;
        id: string;
        attributes?: {
            capabilityType?: CapabilityType;
            settings?: Array<CapabilitySetting>;
        };
    };
};
export namespace BundleIdCapabilityUpdateRequest {
    export enum type {
        BUNDLE_ID_CAPABILITIES = 'bundleIdCapabilities',
    }
}

