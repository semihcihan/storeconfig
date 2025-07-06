/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type BuildBundleFileSize = {
    type: BuildBundleFileSize.type;
    id: string;
    attributes?: {
        deviceModel?: string;
        osVersion?: string;
        downloadBytes?: number;
        installBytes?: number;
    };
    links?: ResourceLinks;
};
export namespace BuildBundleFileSize {
    export enum type {
        BUILD_BUNDLE_FILE_SIZES = 'buildBundleFileSizes',
    }
}

