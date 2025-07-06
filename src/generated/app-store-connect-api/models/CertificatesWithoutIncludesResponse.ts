/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type CertificatesWithoutIncludesResponse = {
    data: Array<Certificate>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

