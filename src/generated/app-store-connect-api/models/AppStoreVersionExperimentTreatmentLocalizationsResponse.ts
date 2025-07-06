/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { AppStoreVersionExperimentTreatmentLocalization } from './AppStoreVersionExperimentTreatmentLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppStoreVersionExperimentTreatmentLocalizationsResponse = {
    data: Array<AppStoreVersionExperimentTreatmentLocalization>;
    included?: Array<(AppStoreVersionExperimentTreatment | AppScreenshotSet | AppPreviewSet)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

