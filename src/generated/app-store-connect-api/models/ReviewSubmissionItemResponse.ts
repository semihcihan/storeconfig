/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { AppEvent } from './AppEvent';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { DocumentLinks } from './DocumentLinks';
import type { ReviewSubmissionItem } from './ReviewSubmissionItem';
export type ReviewSubmissionItemResponse = {
    data: ReviewSubmissionItem;
    included?: Array<(AppStoreVersion | AppCustomProductPageVersion | AppStoreVersionExperiment | AppStoreVersionExperimentV2 | AppEvent)>;
    links: DocumentLinks;
};

