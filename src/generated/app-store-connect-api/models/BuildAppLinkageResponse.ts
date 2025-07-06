/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BuildAppLinkageResponse = {
    data: {
        type: BuildAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BuildAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

