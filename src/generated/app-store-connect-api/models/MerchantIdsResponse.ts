/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { MerchantId } from './MerchantId';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type MerchantIdsResponse = {
    data: Array<MerchantId>;
    included?: Array<Certificate>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

