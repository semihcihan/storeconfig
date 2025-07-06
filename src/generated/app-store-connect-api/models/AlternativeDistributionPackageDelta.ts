/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AlternativeDistributionPackageDelta = {
    type: AlternativeDistributionPackageDelta.type;
    id: string;
    attributes?: {
        url?: string;
        urlExpirationDate?: string;
        alternativeDistributionKeyBlob?: string;
        fileChecksum?: string;
    };
    links?: ResourceLinks;
};
export namespace AlternativeDistributionPackageDelta {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_PACKAGE_DELTAS = 'alternativeDistributionPackageDeltas',
    }
}

