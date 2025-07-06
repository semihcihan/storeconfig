/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BuildPreReleaseVersionLinkageResponse = {
    data: {
        type: BuildPreReleaseVersionLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BuildPreReleaseVersionLinkageResponse {
    export enum type {
        PRE_RELEASE_VERSIONS = 'preReleaseVersions',
    }
}

