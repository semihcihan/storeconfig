/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppBetaLicenseAgreementLinkageResponse = {
    data: {
        type: AppBetaLicenseAgreementLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppBetaLicenseAgreementLinkageResponse {
    export enum type {
        BETA_LICENSE_AGREEMENTS = 'betaLicenseAgreements',
    }
}

