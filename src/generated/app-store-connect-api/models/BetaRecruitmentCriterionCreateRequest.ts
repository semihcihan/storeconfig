/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamilyOsVersionFilter } from './DeviceFamilyOsVersionFilter';
export type BetaRecruitmentCriterionCreateRequest = {
    data: {
        type: BetaRecruitmentCriterionCreateRequest.type;
        attributes: {
            deviceFamilyOsVersionFilters: Array<DeviceFamilyOsVersionFilter>;
        };
        relationships: {
            betaGroup: {
                data: {
                    type: BetaRecruitmentCriterionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaRecruitmentCriterionCreateRequest {
    export enum type {
        BETA_RECRUITMENT_CRITERIA = 'betaRecruitmentCriteria',
    }
}

