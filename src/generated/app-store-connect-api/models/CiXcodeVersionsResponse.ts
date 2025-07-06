/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersion } from './CiMacOsVersion';
import type { CiXcodeVersion } from './CiXcodeVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type CiXcodeVersionsResponse = {
    data: Array<CiXcodeVersion>;
    included?: Array<CiMacOsVersion>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

