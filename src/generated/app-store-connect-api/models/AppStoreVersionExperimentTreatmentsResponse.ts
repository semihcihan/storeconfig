/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { AppStoreVersionExperimentTreatmentLocalization } from './AppStoreVersionExperimentTreatmentLocalization';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppStoreVersionExperimentTreatmentsResponse = {
    data: Array<AppStoreVersionExperimentTreatment>;
    included?: Array<(AppStoreVersionExperiment | AppStoreVersionExperimentV2 | AppStoreVersionExperimentTreatmentLocalization)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

