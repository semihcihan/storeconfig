/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaLicenseAgreementUpdateRequest = {
    data: {
        type: BetaLicenseAgreementUpdateRequest.type;
        id: string;
        attributes?: {
            agreementText?: string;
        };
    };
};
export namespace BetaLicenseAgreementUpdateRequest {
    export enum type {
        BETA_LICENSE_AGREEMENTS = 'betaLicenseAgreements',
    }
}

