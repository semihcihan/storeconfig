/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type ScmPullRequest = {
    type: ScmPullRequest.type;
    id: string;
    attributes?: {
        title?: string;
        number?: number;
        webUrl?: string;
        sourceRepositoryOwner?: string;
        sourceRepositoryName?: string;
        sourceBranchName?: string;
        destinationRepositoryOwner?: string;
        destinationRepositoryName?: string;
        destinationBranchName?: string;
        isClosed?: boolean;
        isCrossRepository?: boolean;
    };
    relationships?: {
        repository?: {
            data?: {
                type: ScmPullRequest.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace ScmPullRequest {
    export enum type {
        SCM_PULL_REQUESTS = 'scmPullRequests',
    }
}

