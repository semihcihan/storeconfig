/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AlternativeDistributionPackageVersion = {
    type: AlternativeDistributionPackageVersion.type;
    id: string;
    attributes?: {
        url?: string;
        urlExpirationDate?: string;
        version?: string;
        fileChecksum?: string;
        state?: AlternativeDistributionPackageVersion.state;
    };
    relationships?: {
        variants?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'alternativeDistributionPackageVariants';
                id: string;
            }>;
        };
        deltas?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'alternativeDistributionPackageDeltas';
                id: string;
            }>;
        };
        alternativeDistributionPackage?: {
            data?: {
                type: AlternativeDistributionPackageVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AlternativeDistributionPackageVersion {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_PACKAGE_VERSIONS = 'alternativeDistributionPackageVersions',
    }
    export enum state {
        COMPLETED = 'COMPLETED',
        REPLACED = 'REPLACED',
    }
}

