/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { AppStoreVersionExperimentTreatmentLocalization } from './AppStoreVersionExperimentTreatmentLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppStoreVersionExperimentTreatmentLocalizationResponse = {
    data: AppStoreVersionExperimentTreatmentLocalization;
    included?: Array<(AppStoreVersionExperimentTreatment | AppScreenshotSet | AppPreviewSet)>;
    links: DocumentLinks;
};

