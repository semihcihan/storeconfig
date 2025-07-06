/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiMacOsVersion = {
    type: CiMacOsVersion.type;
    id: string;
    attributes?: {
        version?: string;
        name?: string;
    };
    relationships?: {
        xcodeVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'ciXcodeVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace CiMacOsVersion {
    export enum type {
        CI_MAC_OS_VERSIONS = 'ciMacOsVersions',
    }
}

