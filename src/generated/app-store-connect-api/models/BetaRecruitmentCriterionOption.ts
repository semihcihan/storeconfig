/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
import type { ResourceLinks } from './ResourceLinks';
export type BetaRecruitmentCriterionOption = {
    type: BetaRecruitmentCriterionOption.type;
    id: string;
    attributes?: {
        deviceFamilyOsVersions?: Array<{
            deviceFamily?: DeviceFamily;
            osVersions?: Array<string>;
        }>;
    };
    links?: ResourceLinks;
};
export namespace BetaRecruitmentCriterionOption {
    export enum type {
        BETA_RECRUITMENT_CRITERION_OPTIONS = 'betaRecruitmentCriterionOptions',
    }
}

