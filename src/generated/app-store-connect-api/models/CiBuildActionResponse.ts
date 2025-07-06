/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBuildAction } from './CiBuildAction';
import type { CiBuildRun } from './CiBuildRun';
import type { DocumentLinks } from './DocumentLinks';
export type CiBuildActionResponse = {
    data: CiBuildAction;
    included?: Array<CiBuildRun>;
    links: DocumentLinks;
};

