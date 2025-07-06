/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { DocumentLinks } from './DocumentLinks';
import type { PassTypeId } from './PassTypeId';
export type CertificateResponse = {
    data: Certificate;
    included?: Array<PassTypeId>;
    links: DocumentLinks;
};

