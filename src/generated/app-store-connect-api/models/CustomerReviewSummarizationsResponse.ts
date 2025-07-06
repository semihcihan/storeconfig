/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerReviewSummarization } from './CustomerReviewSummarization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
export type CustomerReviewSummarizationsResponse = {
    data: Array<CustomerReviewSummarization>;
    included?: Array<Territory>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

