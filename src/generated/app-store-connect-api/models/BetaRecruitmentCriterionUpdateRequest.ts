/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamilyOsVersionFilter } from './DeviceFamilyOsVersionFilter';
export type BetaRecruitmentCriterionUpdateRequest = {
    data: {
        type: BetaRecruitmentCriterionUpdateRequest.type;
        id: string;
        attributes?: {
            deviceFamilyOsVersionFilters?: Array<DeviceFamilyOsVersionFilter>;
        };
    };
};
export namespace BetaRecruitmentCriterionUpdateRequest {
    export enum type {
        BETA_RECRUITMENT_CRITERIA = 'betaRecruitmentCriteria',
    }
}

