/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmProvider } from './ScmProvider';
import type { ScmRepository } from './ScmRepository';
export type ScmRepositoryResponse = {
    data: ScmRepository;
    included?: Array<(ScmProvider | ScmGitReference)>;
    links: DocumentLinks;
};

