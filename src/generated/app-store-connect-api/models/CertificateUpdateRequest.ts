/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CertificateUpdateRequest = {
    data: {
        type: CertificateUpdateRequest.type;
        id: string;
        attributes?: {
            activated?: boolean;
        };
    };
};
export namespace CertificateUpdateRequest {
    export enum type {
        CERTIFICATES = 'certificates',
    }
}

