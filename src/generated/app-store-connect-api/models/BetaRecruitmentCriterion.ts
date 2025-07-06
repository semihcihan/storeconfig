/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamilyOsVersionFilter } from './DeviceFamilyOsVersionFilter';
import type { ResourceLinks } from './ResourceLinks';
export type BetaRecruitmentCriterion = {
    type: BetaRecruitmentCriterion.type;
    id: string;
    attributes?: {
        lastModifiedDate?: string;
        deviceFamilyOsVersionFilters?: Array<DeviceFamilyOsVersionFilter>;
    };
    links?: ResourceLinks;
};
export namespace BetaRecruitmentCriterion {
    export enum type {
        BETA_RECRUITMENT_CRITERIA = 'betaRecruitmentCriteria',
    }
}

