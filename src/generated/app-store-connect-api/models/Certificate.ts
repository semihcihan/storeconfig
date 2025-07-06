/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
import type { CertificateType } from './CertificateType';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type Certificate = {
    type: Certificate.type;
    id: string;
    attributes?: {
        name?: string;
        certificateType?: CertificateType;
        displayName?: string;
        serialNumber?: string;
        platform?: BundleIdPlatform;
        expirationDate?: string;
        certificateContent?: string;
        activated?: boolean;
    };
    relationships?: {
        passTypeId?: {
            links?: RelationshipLinks;
            data?: {
                type: Certificate.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace Certificate {
    export enum type {
        CERTIFICATES = 'certificates',
    }
}

