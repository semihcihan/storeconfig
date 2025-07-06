/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppPreview } from './AppPreview';
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppStoreVersionExperimentTreatmentLocalization } from './AppStoreVersionExperimentTreatmentLocalization';
import type { AppStoreVersionLocalization } from './AppStoreVersionLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppPreviewSetsResponse = {
    data: Array<AppPreviewSet>;
    included?: Array<(AppStoreVersionLocalization | AppCustomProductPageLocalization | AppStoreVersionExperimentTreatmentLocalization | AppPreview)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

