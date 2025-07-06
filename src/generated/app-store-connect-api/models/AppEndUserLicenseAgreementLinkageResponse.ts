/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppEndUserLicenseAgreementLinkageResponse = {
    data: {
        type: AppEndUserLicenseAgreementLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppEndUserLicenseAgreementLinkageResponse {
    export enum type {
        END_USER_LICENSE_AGREEMENTS = 'endUserLicenseAgreements',
    }
}

