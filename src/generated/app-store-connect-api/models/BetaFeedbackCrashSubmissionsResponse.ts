/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaFeedbackCrashSubmission } from './BetaFeedbackCrashSubmission';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaFeedbackCrashSubmissionsResponse = {
    data: Array<BetaFeedbackCrashSubmission>;
    included?: Array<(Build | BetaTester)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

