/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiStartConditionFileMatcher } from './CiStartConditionFileMatcher';
export type CiFilesAndFoldersRule = {
    mode?: CiFilesAndFoldersRule.mode;
    matchers?: Array<CiStartConditionFileMatcher>;
};
export namespace CiFilesAndFoldersRule {
    export enum mode {
        START_IF_ANY_FILE_MATCHES = 'START_IF_ANY_FILE_MATCHES',
        DO_NOT_START_IF_ALL_FILES_MATCH = 'DO_NOT_START_IF_ALL_FILES_MATCH',
    }
}

