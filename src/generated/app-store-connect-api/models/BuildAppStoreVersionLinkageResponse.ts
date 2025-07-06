/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BuildAppStoreVersionLinkageResponse = {
    data: {
        type: BuildAppStoreVersionLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BuildAppStoreVersionLinkageResponse {
    export enum type {
        APP_STORE_VERSIONS = 'appStoreVersions',
    }
}

