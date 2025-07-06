/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AlternativeDistributionDomainCreateRequest = {
    data: {
        type: AlternativeDistributionDomainCreateRequest.type;
        attributes: {
            domain: string;
            referenceName: string;
        };
    };
};
export namespace AlternativeDistributionDomainCreateRequest {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_DOMAINS = 'alternativeDistributionDomains',
    }
}

