/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type AppStoreVersionExperimentsResponse = {
    data: Array<AppStoreVersionExperiment>;
    included?: Array<(AppStoreVersion | AppStoreVersionExperimentTreatment)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

