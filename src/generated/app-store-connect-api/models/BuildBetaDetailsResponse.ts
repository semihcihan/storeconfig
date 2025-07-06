/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from './Build';
import type { BuildBetaDetail } from './BuildBetaDetail';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BuildBetaDetailsResponse = {
    data: Array<BuildBetaDetail>;
    included?: Array<Build>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

