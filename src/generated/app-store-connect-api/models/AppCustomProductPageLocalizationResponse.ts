/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { DocumentLinks } from './DocumentLinks';
export type AppCustomProductPageLocalizationResponse = {
    data: AppCustomProductPageLocalization;
    included?: Array<(AppCustomProductPageVersion | AppScreenshotSet | AppPreviewSet)>;
    links: DocumentLinks;
};

