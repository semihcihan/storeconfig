/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type BetaRecruitmentCriterionCompatibleBuildCheck = {
    type: BetaRecruitmentCriterionCompatibleBuildCheck.type;
    id: string;
    attributes?: {
        hasCompatibleBuild?: boolean;
    };
    links?: ResourceLinks;
};
export namespace BetaRecruitmentCriterionCompatibleBuildCheck {
    export enum type {
        BETA_RECRUITMENT_CRITERION_COMPATIBLE_BUILD_CHECKS = 'betaRecruitmentCriterionCompatibleBuildChecks',
    }
}

