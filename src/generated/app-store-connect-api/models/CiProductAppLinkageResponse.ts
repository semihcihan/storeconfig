/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type CiProductAppLinkageResponse = {
    data: {
        type: CiProductAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace CiProductAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

