/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BetaAppReviewDetail } from './BetaAppReviewDetail';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaAppReviewDetailsResponse = {
    data: Array<BetaAppReviewDetail>;
    included?: Array<App>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

