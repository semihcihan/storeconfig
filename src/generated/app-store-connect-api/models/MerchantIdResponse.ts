/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { DocumentLinks } from './DocumentLinks';
import type { MerchantId } from './MerchantId';
export type MerchantIdResponse = {
    data: MerchantId;
    included?: Array<Certificate>;
    links: DocumentLinks;
};

