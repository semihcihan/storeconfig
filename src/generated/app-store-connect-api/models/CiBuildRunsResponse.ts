/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from './Build';
import type { CiBuildRun } from './CiBuildRun';
import type { CiProduct } from './CiProduct';
import type { CiWorkflow } from './CiWorkflow';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmPullRequest } from './ScmPullRequest';
export type CiBuildRunsResponse = {
    data: Array<CiBuildRun>;
    included?: Array<(Build | CiWorkflow | CiProduct | ScmGitReference | ScmPullRequest)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

