/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiActionType } from './CiActionType';
import type { CiCompletionStatus } from './CiCompletionStatus';
import type { CiExecutionProgress } from './CiExecutionProgress';
import type { CiIssueCounts } from './CiIssueCounts';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiBuildAction = {
    type: CiBuildAction.type;
    id: string;
    attributes?: {
        name?: string;
        actionType?: CiActionType;
        startedDate?: string;
        finishedDate?: string;
        issueCounts?: CiIssueCounts;
        executionProgress?: CiExecutionProgress;
        completionStatus?: CiCompletionStatus;
        isRequiredToPass?: boolean;
    };
    relationships?: {
        buildRun?: {
            links?: RelationshipLinks;
            data?: {
                type: CiBuildAction.type;
                id: string;
            };
        };
        artifacts?: {
            links?: RelationshipLinks;
        };
        issues?: {
            links?: RelationshipLinks;
        };
        testResults?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace CiBuildAction {
    export enum type {
        CI_BUILD_ACTIONS = 'ciBuildActions',
    }
}

