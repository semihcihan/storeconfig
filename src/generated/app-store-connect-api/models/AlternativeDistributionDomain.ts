/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AlternativeDistributionDomain = {
    type: AlternativeDistributionDomain.type;
    id: string;
    attributes?: {
        domain?: string;
        referenceName?: string;
        createdDate?: string;
    };
    links?: ResourceLinks;
};
export namespace AlternativeDistributionDomain {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_DOMAINS = 'alternativeDistributionDomains',
    }
}

