/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AlternativeDistributionPackage = {
    type: AlternativeDistributionPackage.type;
    id: string;
    relationships?: {
        versions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'alternativeDistributionPackageVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AlternativeDistributionPackage {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_PACKAGES = 'alternativeDistributionPackages',
    }
}

