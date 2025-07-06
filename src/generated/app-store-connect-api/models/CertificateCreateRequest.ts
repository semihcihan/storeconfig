/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificateType } from './CertificateType';
export type CertificateCreateRequest = {
    data: {
        type: CertificateCreateRequest.type;
        attributes: {
            csrContent: string;
            certificateType: CertificateType;
        };
        relationships?: {
            merchantId?: {
                data?: {
                    type: CertificateCreateRequest.type;
                    id: string;
                };
            };
            passTypeId?: {
                data?: {
                    type: CertificateCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace CertificateCreateRequest {
    export enum type {
        CERTIFICATES = 'certificates',
    }
}

