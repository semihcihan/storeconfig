/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppScreenshot } from './AppScreenshot';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { AppStoreVersionExperimentTreatmentLocalization } from './AppStoreVersionExperimentTreatmentLocalization';
import type { AppStoreVersionLocalization } from './AppStoreVersionLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppScreenshotSetResponse = {
    data: AppScreenshotSet;
    included?: Array<(AppStoreVersionLocalization | AppCustomProductPageLocalization | AppStoreVersionExperimentTreatmentLocalization | AppScreenshot)>;
    links: DocumentLinks;
};

