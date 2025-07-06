/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { PassTypeId } from './PassTypeId';
export type CertificatesResponse = {
    data: Array<Certificate>;
    included?: Array<PassTypeId>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

