/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CapabilitySetting } from './CapabilitySetting';
import type { CapabilityType } from './CapabilityType';
import type { ResourceLinks } from './ResourceLinks';
export type BundleIdCapability = {
    type: BundleIdCapability.type;
    id: string;
    attributes?: {
        capabilityType?: CapabilityType;
        settings?: Array<CapabilitySetting>;
    };
    links?: ResourceLinks;
};
export namespace BundleIdCapability {
    export enum type {
        BUNDLE_ID_CAPABILITIES = 'bundleIdCapabilities',
    }
}

