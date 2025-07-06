/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AlternativeDistributionPackageCreateRequest = {
    data: {
        type: AlternativeDistributionPackageCreateRequest.type;
        relationships: {
            appStoreVersion: {
                data: {
                    type: AlternativeDistributionPackageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AlternativeDistributionPackageCreateRequest {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_PACKAGES = 'alternativeDistributionPackages',
    }
}

