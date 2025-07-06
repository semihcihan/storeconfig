/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Actor } from './Actor';
import type { App } from './App';
import type { AppStoreVersion } from './AppStoreVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ReviewSubmission } from './ReviewSubmission';
import type { ReviewSubmissionItem } from './ReviewSubmissionItem';
export type ReviewSubmissionsResponse = {
    data: Array<ReviewSubmission>;
    included?: Array<(App | ReviewSubmissionItem | AppStoreVersion | Actor)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

