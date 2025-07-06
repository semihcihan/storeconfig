/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmRepository } from './ScmRepository';
export type ScmGitReferencesResponse = {
    data: Array<ScmGitReference>;
    included?: Array<ScmRepository>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

