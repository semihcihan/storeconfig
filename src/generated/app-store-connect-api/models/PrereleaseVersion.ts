/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type PrereleaseVersion = {
    type: PrereleaseVersion.type;
    id: string;
    attributes?: {
        version?: string;
        platform?: Platform;
    };
    relationships?: {
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: PrereleaseVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace PrereleaseVersion {
    export enum type {
        PRE_RELEASE_VERSIONS = 'preReleaseVersions',
    }
}

