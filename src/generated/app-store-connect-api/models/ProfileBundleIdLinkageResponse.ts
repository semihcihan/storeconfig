/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type ProfileBundleIdLinkageResponse = {
    data: {
        type: ProfileBundleIdLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace ProfileBundleIdLinkageResponse {
    export enum type {
        BUNDLE_IDS = 'bundleIds',
    }
}

