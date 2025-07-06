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
export type CiWorkflowUpdateRequest = {
    data: {
        type: CiWorkflowUpdateRequest.type;
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
        };
        relationships?: {
            xcodeVersion?: {
                data?: {
                    type: CiWorkflowUpdateRequest.type;
                    id: string;
                };
            };
            macOsVersion?: {
                data?: {
                    type: CiWorkflowUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace CiWorkflowUpdateRequest {
    export enum type {
        CI_WORKFLOWS = 'ciWorkflows',
    }
}

