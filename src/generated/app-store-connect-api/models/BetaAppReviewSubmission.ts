/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaReviewState } from './BetaReviewState';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaAppReviewSubmission = {
    type: BetaAppReviewSubmission.type;
    id: string;
    attributes?: {
        betaReviewState?: BetaReviewState;
        submittedDate?: string;
    };
    relationships?: {
        build?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaAppReviewSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaAppReviewSubmission {
    export enum type {
        BETA_APP_REVIEW_SUBMISSIONS = 'betaAppReviewSubmissions',
    }
}

