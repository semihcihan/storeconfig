/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
/**
 * @deprecated
 */
export type AppStoreVersionExperiment = {
    type: AppStoreVersionExperiment.type;
    id: string;
    attributes?: {
        name?: string;
        trafficProportion?: number;
        state?: AppStoreVersionExperiment.state;
        reviewRequired?: boolean;
        startDate?: string;
        endDate?: string;
    };
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: AppStoreVersionExperiment.type;
                id: string;
            };
        };
        appStoreVersionExperimentTreatments?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionExperimentTreatments';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersionExperiment {
    export enum type {
        APP_STORE_VERSION_EXPERIMENTS = 'appStoreVersionExperiments',
    }
    export enum state {
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        ACCEPTED = 'ACCEPTED',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        COMPLETED = 'COMPLETED',
        STOPPED = 'STOPPED',
    }
}

