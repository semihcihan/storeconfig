/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BetaLicenseAgreement } from './BetaLicenseAgreement';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaLicenseAgreementsResponse = {
    data: Array<BetaLicenseAgreement>;
    included?: Array<App>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

