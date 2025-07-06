/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEvent } from './AppEvent';
import type { AppEventLocalization } from './AppEventLocalization';
import type { AppEventScreenshot } from './AppEventScreenshot';
import type { AppEventVideoClip } from './AppEventVideoClip';
import type { DocumentLinks } from './DocumentLinks';
export type AppEventLocalizationResponse = {
    data: AppEventLocalization;
    included?: Array<(AppEvent | AppEventScreenshot | AppEventVideoClip)>;
    links: DocumentLinks;
};

