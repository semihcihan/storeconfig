/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersionExperimentV2 = {
    type: AppStoreVersionExperimentV2.type;
    id: string;
    attributes?: {
        name?: string;
        platform?: Platform;
        trafficProportion?: number;
        state?: AppStoreVersionExperimentV2.state;
        reviewRequired?: boolean;
        startDate?: string;
        endDate?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppStoreVersionExperimentV2.type;
                id: string;
            };
        };
        latestControlVersion?: {
            data?: {
                type: AppStoreVersionExperimentV2.type;
                id: string;
            };
        };
        controlVersions?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersions';
                id: string;
            }>;
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
export namespace AppStoreVersionExperimentV2 {
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

