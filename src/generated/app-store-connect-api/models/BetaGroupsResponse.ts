/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BetaGroup } from './BetaGroup';
import type { BetaRecruitmentCriterion } from './BetaRecruitmentCriterion';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaGroupsResponse = {
    data: Array<BetaGroup>;
    included?: Array<(App | Build | BetaTester | BetaRecruitmentCriterion)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

