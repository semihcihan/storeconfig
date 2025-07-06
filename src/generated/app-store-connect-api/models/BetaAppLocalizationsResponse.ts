/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BetaAppLocalization } from './BetaAppLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaAppLocalizationsResponse = {
    data: Array<BetaAppLocalization>;
    included?: Array<App>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

