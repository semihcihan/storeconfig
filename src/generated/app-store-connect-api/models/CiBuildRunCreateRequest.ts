/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CiBuildRunCreateRequest = {
    data: {
        type: CiBuildRunCreateRequest.type;
        attributes?: {
            clean?: boolean;
        };
        relationships?: {
            buildRun?: {
                data?: {
                    type: CiBuildRunCreateRequest.type;
                    id: string;
                };
            };
            workflow?: {
                data?: {
                    type: CiBuildRunCreateRequest.type;
                    id: string;
                };
            };
            sourceBranchOrTag?: {
                data?: {
                    type: CiBuildRunCreateRequest.type;
                    id: string;
                };
            };
            pullRequest?: {
                data?: {
                    type: CiBuildRunCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace CiBuildRunCreateRequest {
    export enum type {
        CI_BUILD_RUNS = 'ciBuildRuns',
    }
}

