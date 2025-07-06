/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaAppReviewDetail = {
    type: BetaAppReviewDetail.type;
    id: string;
    attributes?: {
        contactFirstName?: string;
        contactLastName?: string;
        contactPhone?: string;
        contactEmail?: string;
        demoAccountName?: string;
        demoAccountPassword?: string;
        demoAccountRequired?: boolean;
        notes?: string;
    };
    relationships?: {
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaAppReviewDetail.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaAppReviewDetail {
    export enum type {
        BETA_APP_REVIEW_DETAILS = 'betaAppReviewDetails',
    }
}

