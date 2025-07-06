/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type AppStoreVersionExperimentResponse = {
    data: AppStoreVersionExperiment;
    included?: Array<(AppStoreVersion | AppStoreVersionExperimentTreatment)>;
    links: DocumentLinks;
};

