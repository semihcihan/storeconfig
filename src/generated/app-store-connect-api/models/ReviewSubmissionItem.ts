/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type ReviewSubmissionItem = {
    type: ReviewSubmissionItem.type;
    id: string;
    attributes?: {
        state?: ReviewSubmissionItem.state;
    };
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: ReviewSubmissionItem.type;
                id: string;
            };
        };
        appCustomProductPageVersion?: {
            data?: {
                type: ReviewSubmissionItem.type;
                id: string;
            };
        };
        appStoreVersionExperiment?: {
            data?: {
                type: ReviewSubmissionItem.type;
                id: string;
            };
        };
        appStoreVersionExperimentV2?: {
            data?: {
                type: ReviewSubmissionItem.type;
                id: string;
            };
        };
        appEvent?: {
            data?: {
                type: ReviewSubmissionItem.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace ReviewSubmissionItem {
    export enum type {
        REVIEW_SUBMISSION_ITEMS = 'reviewSubmissionItems',
    }
    export enum state {
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        ACCEPTED = 'ACCEPTED',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        REMOVED = 'REMOVED',
    }
}

