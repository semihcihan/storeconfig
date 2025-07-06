/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmProvider } from './ScmProvider';
import type { ScmRepository } from './ScmRepository';
export type ScmRepositoriesResponse = {
    data: Array<ScmRepository>;
    included?: Array<(ScmProvider | ScmGitReference)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

