/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BuildBetaDetailBuildLinkageResponse = {
    data: {
        type: BuildBetaDetailBuildLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BuildBetaDetailBuildLinkageResponse {
    export enum type {
        BUILDS = 'builds',
    }
}

