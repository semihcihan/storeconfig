/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaFeedbackScreenshotSubmission } from './BetaFeedbackScreenshotSubmission';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type BetaFeedbackScreenshotSubmissionResponse = {
    data: BetaFeedbackScreenshotSubmission;
    included?: Array<(Build | BetaTester)>;
    links: DocumentLinks;
};

