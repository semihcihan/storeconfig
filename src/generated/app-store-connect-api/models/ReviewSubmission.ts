/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type ReviewSubmission = {
    type: ReviewSubmission.type;
    id: string;
    attributes?: {
        platform?: Platform;
        submittedDate?: string;
        state?: ReviewSubmission.state;
    };
    relationships?: {
        app?: {
            data?: {
                type: ReviewSubmission.type;
                id: string;
            };
        };
        items?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'reviewSubmissionItems';
                id: string;
            }>;
        };
        appStoreVersionForReview?: {
            data?: {
                type: ReviewSubmission.type;
                id: string;
            };
        };
        submittedByActor?: {
            data?: {
                type: ReviewSubmission.type;
                id: string;
            };
        };
        lastUpdatedByActor?: {
            data?: {
                type: ReviewSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace ReviewSubmission {
    export enum type {
        REVIEW_SUBMISSIONS = 'reviewSubmissions',
    }
    export enum state {
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        UNRESOLVED_ISSUES = 'UNRESOLVED_ISSUES',
        CANCELING = 'CANCELING',
        COMPLETING = 'COMPLETING',
        COMPLETE = 'COMPLETE',
    }
}

