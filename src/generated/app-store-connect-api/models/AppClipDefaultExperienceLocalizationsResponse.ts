/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { AppClipDefaultExperienceLocalization } from './AppClipDefaultExperienceLocalization';
import type { AppClipHeaderImage } from './AppClipHeaderImage';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppClipDefaultExperienceLocalizationsResponse = {
    data: Array<AppClipDefaultExperienceLocalization>;
    included?: Array<(AppClipDefaultExperience | AppClipHeaderImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

