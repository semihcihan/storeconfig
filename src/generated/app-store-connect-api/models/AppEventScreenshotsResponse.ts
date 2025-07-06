/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventLocalization } from './AppEventLocalization';
import type { AppEventScreenshot } from './AppEventScreenshot';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppEventScreenshotsResponse = {
    data: Array<AppEventScreenshot>;
    included?: Array<AppEventLocalization>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

