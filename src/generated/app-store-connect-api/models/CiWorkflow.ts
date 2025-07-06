/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiAction } from './CiAction';
import type { CiBranchStartCondition } from './CiBranchStartCondition';
import type { CiManualBranchStartCondition } from './CiManualBranchStartCondition';
import type { CiManualPullRequestStartCondition } from './CiManualPullRequestStartCondition';
import type { CiManualTagStartCondition } from './CiManualTagStartCondition';
import type { CiPullRequestStartCondition } from './CiPullRequestStartCondition';
import type { CiScheduledStartCondition } from './CiScheduledStartCondition';
import type { CiTagStartCondition } from './CiTagStartCondition';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiWorkflow = {
    type: CiWorkflow.type;
    id: string;
    attributes?: {
        name?: string;
        description?: string;
        branchStartCondition?: CiBranchStartCondition;
        tagStartCondition?: CiTagStartCondition;
        pullRequestStartCondition?: CiPullRequestStartCondition;
        scheduledStartCondition?: CiScheduledStartCondition;
        manualBranchStartCondition?: CiManualBranchStartCondition;
        manualTagStartCondition?: CiManualTagStartCondition;
        manualPullRequestStartCondition?: CiManualPullRequestStartCondition;
        actions?: Array<CiAction>;
        isEnabled?: boolean;
        isLockedForEditing?: boolean;
        clean?: boolean;
        containerFilePath?: string;
        lastModifiedDate?: string;
    };
    relationships?: {
        product?: {
            data?: {
                type: CiWorkflow.type;
                id: string;
            };
        };
        repository?: {
            links?: RelationshipLinks;
            data?: {
                type: CiWorkflow.type;
                id: string;
            };
        };
        xcodeVersion?: {
            data?: {
                type: CiWorkflow.type;
                id: string;
            };
        };
        macOsVersion?: {
            data?: {
                type: CiWorkflow.type;
                id: string;
            };
        };
        buildRuns?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace CiWorkflow {
    export enum type {
        CI_WORKFLOWS = 'ciWorkflows',
    }
}

