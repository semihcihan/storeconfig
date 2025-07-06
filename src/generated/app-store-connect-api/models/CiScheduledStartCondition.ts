/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBranchPatterns } from './CiBranchPatterns';
export type CiScheduledStartCondition = {
    source?: CiBranchPatterns;
    schedule?: {
        frequency?: CiScheduledStartCondition.frequency;
        days?: Array<'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'>;
        hour?: number;
        minute?: number;
        timezone?: string;
    };
};
export namespace CiScheduledStartCondition {
    export enum frequency {
        WEEKLY = 'WEEKLY',
        DAILY = 'DAILY',
        HOURLY = 'HOURLY',
    }
}

