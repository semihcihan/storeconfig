/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Actor } from './Actor';
import type { App } from './App';
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
import type { ReviewSubmission } from './ReviewSubmission';
import type { ReviewSubmissionItem } from './ReviewSubmissionItem';
export type ReviewSubmissionResponse = {
    data: ReviewSubmission;
    included?: Array<(App | ReviewSubmissionItem | AppStoreVersion | Actor)>;
    links: DocumentLinks;
};

