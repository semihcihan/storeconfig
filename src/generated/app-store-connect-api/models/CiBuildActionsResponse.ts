/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBuildAction } from './CiBuildAction';
import type { CiBuildRun } from './CiBuildRun';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type CiBuildActionsResponse = {
    data: Array<CiBuildAction>;
    included?: Array<CiBuildRun>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

