/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileLocation } from './FileLocation';
import type { ResourceLinks } from './ResourceLinks';
export type CiIssue = {
    type: CiIssue.type;
    id: string;
    attributes?: {
        issueType?: CiIssue.issueType;
        message?: string;
        fileSource?: FileLocation;
        category?: string;
    };
    links?: ResourceLinks;
};
export namespace CiIssue {
    export enum type {
        CI_ISSUES = 'ciIssues',
    }
    export enum issueType {
        ANALYZER_WARNING = 'ANALYZER_WARNING',
        ERROR = 'ERROR',
        TEST_FAILURE = 'TEST_FAILURE',
        WARNING = 'WARNING',
    }
}

