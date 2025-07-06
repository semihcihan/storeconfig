/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppReviewSubmission } from './BetaAppReviewSubmission';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaAppReviewSubmissionsResponse = {
    data: Array<BetaAppReviewSubmission>;
    included?: Array<Build>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

