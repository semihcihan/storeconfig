/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type EndUserLicenseAgreement = {
    type: EndUserLicenseAgreement.type;
    id: string;
    attributes?: {
        agreementText?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: EndUserLicenseAgreement.type;
                id: string;
            };
        };
        territories?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'territories';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace EndUserLicenseAgreement {
    export enum type {
        END_USER_LICENSE_AGREEMENTS = 'endUserLicenseAgreements',
    }
}

