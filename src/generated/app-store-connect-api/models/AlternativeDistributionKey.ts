/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AlternativeDistributionKey = {
    type: AlternativeDistributionKey.type;
    id: string;
    attributes?: {
        publicKey?: string;
    };
    links?: ResourceLinks;
};
export namespace AlternativeDistributionKey {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_KEYS = 'alternativeDistributionKeys',
    }
}

