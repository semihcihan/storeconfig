/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerReview } from './CustomerReview';
import type { CustomerReviewResponseV1 } from './CustomerReviewResponseV1';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type CustomerReviewsResponse = {
    data: Array<CustomerReview>;
    included?: Array<CustomerReviewResponseV1>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

