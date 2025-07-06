/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { PrereleaseVersion } from './PrereleaseVersion';
export type PreReleaseVersionsResponse = {
    data: Array<PrereleaseVersion>;
    included?: Array<(Build | App)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

