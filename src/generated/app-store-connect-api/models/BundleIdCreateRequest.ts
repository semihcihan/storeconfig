/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
export type BundleIdCreateRequest = {
    data: {
        type: BundleIdCreateRequest.type;
        attributes: {
            name: string;
            platform: BundleIdPlatform;
            identifier: string;
            seedId?: string;
        };
    };
};
export namespace BundleIdCreateRequest {
    export enum type {
        BUNDLE_IDS = 'bundleIds',
    }
}

