/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppScreenshot } from './AppScreenshot';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppScreenshotsResponse = {
    data: Array<AppScreenshot>;
    included?: Array<AppScreenshotSet>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

