/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClip } from './AppClip';
import type { AppClipAdvancedExperience } from './AppClipAdvancedExperience';
import type { AppClipAdvancedExperienceImage } from './AppClipAdvancedExperienceImage';
import type { AppClipAdvancedExperienceLocalization } from './AppClipAdvancedExperienceLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppClipAdvancedExperienceResponse = {
    data: AppClipAdvancedExperience;
    included?: Array<(AppClip | AppClipAdvancedExperienceImage | AppClipAdvancedExperienceLocalization)>;
    links: DocumentLinks;
};

