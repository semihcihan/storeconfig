/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AlternativeDistributionKeyCreateRequest = {
    data: {
        type: AlternativeDistributionKeyCreateRequest.type;
        attributes: {
            publicKey: string;
        };
        relationships?: {
            app?: {
                data?: {
                    type: AlternativeDistributionKeyCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AlternativeDistributionKeyCreateRequest {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_KEYS = 'alternativeDistributionKeys',
    }
}

