/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionLocalization } from './AppStoreVersionLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppStoreVersionLocalizationsResponse = {
    data: Array<AppStoreVersionLocalization>;
    included?: Array<(AppStoreVersion | AppScreenshotSet | AppPreviewSet)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

