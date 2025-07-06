/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type CiArtifact = {
    type: CiArtifact.type;
    id: string;
    attributes?: {
        fileType?: CiArtifact.fileType;
        fileName?: string;
        fileSize?: number;
        downloadUrl?: string;
    };
    links?: ResourceLinks;
};
export namespace CiArtifact {
    export enum type {
        CI_ARTIFACTS = 'ciArtifacts',
    }
    export enum fileType {
        ARCHIVE = 'ARCHIVE',
        ARCHIVE_EXPORT = 'ARCHIVE_EXPORT',
        LOG_BUNDLE = 'LOG_BUNDLE',
        RESULT_BUNDLE = 'RESULT_BUNDLE',
        TEST_PRODUCTS = 'TEST_PRODUCTS',
        XCODEBUILD_PRODUCTS = 'XCODEBUILD_PRODUCTS',
        STAPLED_NOTARIZED_ARCHIVE = 'STAPLED_NOTARIZED_ARCHIVE',
    }
}

