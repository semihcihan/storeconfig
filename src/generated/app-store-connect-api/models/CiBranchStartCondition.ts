/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiBranchPatterns } from './CiBranchPatterns';
import type { CiFilesAndFoldersRule } from './CiFilesAndFoldersRule';
export type CiBranchStartCondition = {
    source?: CiBranchPatterns;
    filesAndFoldersRule?: CiFilesAndFoldersRule;
    autoCancel?: boolean;
};

