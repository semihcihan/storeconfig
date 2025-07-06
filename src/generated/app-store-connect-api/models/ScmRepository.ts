/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type ScmRepository = {
    type: ScmRepository.type;
    id: string;
    attributes?: {
        lastAccessedDate?: string;
        httpCloneUrl?: string;
        sshCloneUrl?: string;
        ownerName?: string;
        repositoryName?: string;
    };
    relationships?: {
        scmProvider?: {
            data?: {
                type: ScmRepository.type;
                id: string;
            };
        };
        defaultBranch?: {
            data?: {
                type: ScmRepository.type;
                id: string;
            };
        };
        gitReferences?: {
            links?: RelationshipLinks;
        };
        pullRequests?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace ScmRepository {
    export enum type {
        SCM_REPOSITORIES = 'scmRepositories',
    }
}

