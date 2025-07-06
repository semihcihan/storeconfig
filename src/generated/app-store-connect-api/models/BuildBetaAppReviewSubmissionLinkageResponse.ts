/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BuildBetaAppReviewSubmissionLinkageResponse = {
    data: {
        type: BuildBetaAppReviewSubmissionLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BuildBetaAppReviewSubmissionLinkageResponse {
    export enum type {
        BETA_APP_REVIEW_SUBMISSIONS = 'betaAppReviewSubmissions',
    }
}

