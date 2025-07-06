/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { AppClipDefaultExperienceLocalization } from './AppClipDefaultExperienceLocalization';
import type { AppClipHeaderImage } from './AppClipHeaderImage';
import type { DocumentLinks } from './DocumentLinks';
export type AppClipDefaultExperienceLocalizationResponse = {
    data: AppClipDefaultExperienceLocalization;
    included?: Array<(AppClipDefaultExperience | AppClipHeaderImage)>;
    links: DocumentLinks;
};

