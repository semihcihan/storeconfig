/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { ScmPullRequest } from './ScmPullRequest';
import type { ScmRepository } from './ScmRepository';
export type ScmPullRequestResponse = {
    data: ScmPullRequest;
    included?: Array<ScmRepository>;
    links: DocumentLinks;
};

