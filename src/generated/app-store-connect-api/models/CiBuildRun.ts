/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiCompletionStatus } from './CiCompletionStatus';
import type { CiExecutionProgress } from './CiExecutionProgress';
import type { CiGitUser } from './CiGitUser';
import type { CiIssueCounts } from './CiIssueCounts';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiBuildRun = {
    type: CiBuildRun.type;
    id: string;
    attributes?: {
        number?: number;
        createdDate?: string;
        startedDate?: string;
        finishedDate?: string;
        sourceCommit?: {
            commitSha?: string;
            message?: string;
            author?: CiGitUser;
            committer?: CiGitUser;
            webUrl?: string;
        };
        destinationCommit?: {
            commitSha?: string;
            message?: string;
            author?: CiGitUser;
            committer?: CiGitUser;
            webUrl?: string;
        };
        isPullRequestBuild?: boolean;
        issueCounts?: CiIssueCounts;
        executionProgress?: CiExecutionProgress;
        completionStatus?: CiCompletionStatus;
        startReason?: CiBuildRun.startReason;
        cancelReason?: CiBuildRun.cancelReason;
    };
    relationships?: {
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
        workflow?: {
            data?: {
                type: CiBuildRun.type;
                id: string;
            };
        };
        product?: {
            data?: {
                type: CiBuildRun.type;
                id: string;
            };
        };
        sourceBranchOrTag?: {
            data?: {
                type: CiBuildRun.type;
                id: string;
            };
        };
        destinationBranch?: {
            data?: {
                type: CiBuildRun.type;
                id: string;
            };
        };
        actions?: {
            links?: RelationshipLinks;
        };
        pullRequest?: {
            data?: {
                type: CiBuildRun.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace CiBuildRun {
    export enum type {
        CI_BUILD_RUNS = 'ciBuildRuns',
    }
    export enum startReason {
        GIT_REF_CHANGE = 'GIT_REF_CHANGE',
        MANUAL = 'MANUAL',
        MANUAL_REBUILD = 'MANUAL_REBUILD',
        PULL_REQUEST_OPEN = 'PULL_REQUEST_OPEN',
        PULL_REQUEST_UPDATE = 'PULL_REQUEST_UPDATE',
        SCHEDULE = 'SCHEDULE',
    }
    export enum cancelReason {
        AUTOMATICALLY_BY_NEWER_BUILD = 'AUTOMATICALLY_BY_NEWER_BUILD',
        MANUALLY_BY_USER = 'MANUALLY_BY_USER',
    }
}

