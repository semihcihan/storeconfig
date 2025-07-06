/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppReviewSubmission } from './BetaAppReviewSubmission';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type BetaAppReviewSubmissionResponse = {
    data: BetaAppReviewSubmission;
    included?: Array<Build>;
    links: DocumentLinks;
};

