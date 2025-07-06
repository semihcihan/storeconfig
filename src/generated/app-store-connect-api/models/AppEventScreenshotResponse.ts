/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventLocalization } from './AppEventLocalization';
import type { AppEventScreenshot } from './AppEventScreenshot';
import type { DocumentLinks } from './DocumentLinks';
export type AppEventScreenshotResponse = {
    data: AppEventScreenshot;
    included?: Array<AppEventLocalization>;
    links: DocumentLinks;
};

