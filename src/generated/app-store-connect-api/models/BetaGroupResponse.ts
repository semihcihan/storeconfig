/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BetaGroup } from './BetaGroup';
import type { BetaRecruitmentCriterion } from './BetaRecruitmentCriterion';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type BetaGroupResponse = {
    data: BetaGroup;
    included?: Array<(App | Build | BetaTester | BetaRecruitmentCriterion)>;
    links: DocumentLinks;
};

