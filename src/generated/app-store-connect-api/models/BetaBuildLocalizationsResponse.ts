/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaBuildLocalization } from './BetaBuildLocalization';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaBuildLocalizationsResponse = {
    data: Array<BetaBuildLocalization>;
    included?: Array<Build>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

