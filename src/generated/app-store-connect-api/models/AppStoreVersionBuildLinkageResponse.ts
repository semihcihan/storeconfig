/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppStoreVersionBuildLinkageResponse = {
    data: {
        type: AppStoreVersionBuildLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppStoreVersionBuildLinkageResponse {
    export enum type {
        BUILDS = 'builds',
    }
}

