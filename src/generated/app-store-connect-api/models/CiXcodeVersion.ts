/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiTestDestinationKind } from './CiTestDestinationKind';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiXcodeVersion = {
    type: CiXcodeVersion.type;
    id: string;
    attributes?: {
        version?: string;
        name?: string;
        testDestinations?: Array<{
            deviceTypeName?: string;
            deviceTypeIdentifier?: string;
            availableRuntimes?: Array<{
                runtimeName?: string;
                runtimeIdentifier?: string;
            }>;
            kind?: CiTestDestinationKind;
        }>;
    };
    relationships?: {
        macOsVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'ciMacOsVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace CiXcodeVersion {
    export enum type {
        CI_XCODE_VERSIONS = 'ciXcodeVersions',
    }
}

