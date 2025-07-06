/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BundleIdUpdateRequest = {
    data: {
        type: BundleIdUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
        };
    };
};
export namespace BundleIdUpdateRequest {
    export enum type {
        BUNDLE_IDS = 'bundleIds',
    }
}

