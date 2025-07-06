/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { AppEvent } from './AppEvent';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ReviewSubmissionItem } from './ReviewSubmissionItem';
export type ReviewSubmissionItemsResponse = {
    data: Array<ReviewSubmissionItem>;
    included?: Array<(AppStoreVersion | AppCustomProductPageVersion | AppStoreVersionExperiment | AppStoreVersionExperimentV2 | AppEvent)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

