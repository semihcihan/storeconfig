/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaLicenseAgreement = {
    type: BetaLicenseAgreement.type;
    id: string;
    attributes?: {
        agreementText?: string;
    };
    relationships?: {
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaLicenseAgreement.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaLicenseAgreement {
    export enum type {
        BETA_LICENSE_AGREEMENTS = 'betaLicenseAgreements',
    }
}

