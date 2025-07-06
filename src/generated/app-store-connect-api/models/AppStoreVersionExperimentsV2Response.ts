/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperimentTreatment } from './AppStoreVersionExperimentTreatment';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppStoreVersionExperimentsV2Response = {
    data: Array<AppStoreVersionExperimentV2>;
    included?: Array<(App | AppStoreVersion | AppStoreVersionExperimentTreatment)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

