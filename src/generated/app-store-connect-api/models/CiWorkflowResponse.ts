/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersion } from './CiMacOsVersion';
import type { CiProduct } from './CiProduct';
import type { CiWorkflow } from './CiWorkflow';
import type { CiXcodeVersion } from './CiXcodeVersion';
import type { DocumentLinks } from './DocumentLinks';
import type { ScmRepository } from './ScmRepository';
export type CiWorkflowResponse = {
    data: CiWorkflow;
    included?: Array<(CiProduct | ScmRepository | CiXcodeVersion | CiMacOsVersion)>;
    links: DocumentLinks;
};

