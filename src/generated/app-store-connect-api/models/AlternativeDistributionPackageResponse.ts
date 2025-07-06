/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackage } from './AlternativeDistributionPackage';
import type { AlternativeDistributionPackageVersion } from './AlternativeDistributionPackageVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AlternativeDistributionPackageResponse = {
    data: AlternativeDistributionPackage;
    included?: Array<AlternativeDistributionPackageVersion>;
    links: DocumentLinks;
};

