/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaFeedbackCrashSubmission } from './BetaFeedbackCrashSubmission';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type BetaFeedbackCrashSubmissionResponse = {
    data: BetaFeedbackCrashSubmission;
    included?: Array<(Build | BetaTester)>;
    links: DocumentLinks;
};

