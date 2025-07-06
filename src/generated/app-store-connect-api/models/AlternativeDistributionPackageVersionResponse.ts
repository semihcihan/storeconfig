/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackage } from './AlternativeDistributionPackage';
import type { AlternativeDistributionPackageDelta } from './AlternativeDistributionPackageDelta';
import type { AlternativeDistributionPackageVariant } from './AlternativeDistributionPackageVariant';
import type { AlternativeDistributionPackageVersion } from './AlternativeDistributionPackageVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AlternativeDistributionPackageVersionResponse = {
    data: AlternativeDistributionPackageVersion;
    included?: Array<(AlternativeDistributionPackageVariant | AlternativeDistributionPackageDelta | AlternativeDistributionPackage)>;
    links: DocumentLinks;
};

