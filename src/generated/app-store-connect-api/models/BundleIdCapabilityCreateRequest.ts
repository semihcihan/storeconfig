/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CapabilitySetting } from './CapabilitySetting';
import type { CapabilityType } from './CapabilityType';
export type BundleIdCapabilityCreateRequest = {
    data: {
        type: BundleIdCapabilityCreateRequest.type;
        attributes: {
            capabilityType: CapabilityType;
            settings?: Array<CapabilitySetting>;
        };
        relationships: {
            bundleId: {
                data: {
                    type: BundleIdCapabilityCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BundleIdCapabilityCreateRequest {
    export enum type {
        BUNDLE_ID_CAPABILITIES = 'bundleIdCapabilities',
    }
}

