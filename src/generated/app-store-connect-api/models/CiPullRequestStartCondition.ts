/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBranchPatterns } from './CiBranchPatterns';
import type { CiFilesAndFoldersRule } from './CiFilesAndFoldersRule';
export type CiPullRequestStartCondition = {
    source?: CiBranchPatterns;
    destination?: CiBranchPatterns;
    filesAndFoldersRule?: CiFilesAndFoldersRule;
    autoCancel?: boolean;
};

