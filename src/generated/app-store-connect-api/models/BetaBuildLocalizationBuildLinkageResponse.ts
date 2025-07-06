/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BetaBuildLocalizationBuildLinkageResponse = {
    data: {
        type: BetaBuildLocalizationBuildLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BetaBuildLocalizationBuildLinkageResponse {
    export enum type {
        BUILDS = 'builds',
    }
}

