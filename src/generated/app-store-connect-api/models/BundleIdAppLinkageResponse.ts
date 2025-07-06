/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BundleIdAppLinkageResponse = {
    data: {
        type: BundleIdAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BundleIdAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

