/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from './Build';
import type { CiBuildRun } from './CiBuildRun';
import type { CiProduct } from './CiProduct';
import type { CiWorkflow } from './CiWorkflow';
import type { DocumentLinks } from './DocumentLinks';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmPullRequest } from './ScmPullRequest';
export type CiBuildRunResponse = {
    data: CiBuildRun;
    included?: Array<(Build | CiWorkflow | CiProduct | ScmGitReference | ScmPullRequest)>;
    links: DocumentLinks;
};

