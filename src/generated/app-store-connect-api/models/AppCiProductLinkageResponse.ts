/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppCiProductLinkageResponse = {
    data: {
        type: AppCiProductLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppCiProductLinkageResponse {
    export enum type {
        CI_PRODUCTS = 'ciProducts',
    }
}

