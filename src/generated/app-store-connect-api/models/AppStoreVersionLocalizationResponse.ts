/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionLocalization } from './AppStoreVersionLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppStoreVersionLocalizationResponse = {
    data: AppStoreVersionLocalization;
    included?: Array<(AppStoreVersion | AppScreenshotSet | AppPreviewSet)>;
    links: DocumentLinks;
};

