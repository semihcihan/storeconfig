/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ScmPullRequest } from './ScmPullRequest';
import type { ScmRepository } from './ScmRepository';
export type ScmPullRequestsResponse = {
    data: Array<ScmPullRequest>;
    included?: Array<ScmRepository>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

