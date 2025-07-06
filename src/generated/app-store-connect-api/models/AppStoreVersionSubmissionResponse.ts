/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionSubmission } from './AppStoreVersionSubmission';
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type AppStoreVersionSubmissionResponse = {
    data: AppStoreVersionSubmission;
    included?: Array<AppStoreVersion>;
    links: DocumentLinks;
};

