/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type PrereleaseVersionAppLinkageResponse = {
    data: {
        type: PrereleaseVersionAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace PrereleaseVersionAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

