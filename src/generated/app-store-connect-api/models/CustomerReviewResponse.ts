/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerReview } from './CustomerReview';
import type { CustomerReviewResponseV1 } from './CustomerReviewResponseV1';
import type { DocumentLinks } from './DocumentLinks';
export type CustomerReviewResponse = {
    data: CustomerReview;
    included?: Array<CustomerReviewResponseV1>;
    links: DocumentLinks;
};

