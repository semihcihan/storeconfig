/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type CertificatePassTypeIdLinkageResponse = {
    data: {
        type: CertificatePassTypeIdLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace CertificatePassTypeIdLinkageResponse {
    export enum type {
        PASS_TYPE_IDS = 'passTypeIds',
    }
}

