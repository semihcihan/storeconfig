/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type CiBuildActionBuildRunLinkageResponse = {
    data: {
        type: CiBuildActionBuildRunLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace CiBuildActionBuildRunLinkageResponse {
    export enum type {
        CI_BUILD_RUNS = 'ciBuildRuns',
    }
}

