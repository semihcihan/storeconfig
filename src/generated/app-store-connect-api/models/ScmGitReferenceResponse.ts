/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { ScmGitReference } from './ScmGitReference';
import type { ScmRepository } from './ScmRepository';
export type ScmGitReferenceResponse = {
    data: ScmGitReference;
    included?: Array<ScmRepository>;
    links: DocumentLinks;
};

