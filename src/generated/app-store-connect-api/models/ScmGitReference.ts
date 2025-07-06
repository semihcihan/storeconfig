/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiGitRefKind } from './CiGitRefKind';
import type { ResourceLinks } from './ResourceLinks';
export type ScmGitReference = {
    type: ScmGitReference.type;
    id: string;
    attributes?: {
        name?: string;
        canonicalName?: string;
        isDeleted?: boolean;
        kind?: CiGitRefKind;
    };
    relationships?: {
        repository?: {
            data?: {
                type: ScmGitReference.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace ScmGitReference {
    export enum type {
        SCM_GIT_REFERENCES = 'scmGitReferences',
    }
}

