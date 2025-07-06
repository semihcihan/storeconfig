/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BetaGroupAppLinkageResponse = {
    data: {
        type: BetaGroupAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BetaGroupAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

