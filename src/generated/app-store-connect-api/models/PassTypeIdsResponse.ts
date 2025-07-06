/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { PassTypeId } from './PassTypeId';
export type PassTypeIdsResponse = {
    data: Array<PassTypeId>;
    included?: Array<Certificate>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

