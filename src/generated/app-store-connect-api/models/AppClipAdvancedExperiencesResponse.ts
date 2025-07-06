/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClip } from './AppClip';
import type { AppClipAdvancedExperience } from './AppClipAdvancedExperience';
import type { AppClipAdvancedExperienceImage } from './AppClipAdvancedExperienceImage';
import type { AppClipAdvancedExperienceLocalization } from './AppClipAdvancedExperienceLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppClipAdvancedExperiencesResponse = {
    data: Array<AppClipAdvancedExperience>;
    included?: Array<(AppClip | AppClipAdvancedExperienceImage | AppClipAdvancedExperienceLocalization)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

