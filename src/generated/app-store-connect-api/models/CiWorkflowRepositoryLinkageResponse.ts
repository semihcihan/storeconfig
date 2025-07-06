/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type CiWorkflowRepositoryLinkageResponse = {
    data: {
        type: CiWorkflowRepositoryLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace CiWorkflowRepositoryLinkageResponse {
    export enum type {
        SCM_REPOSITORIES = 'scmRepositories',
    }
}

