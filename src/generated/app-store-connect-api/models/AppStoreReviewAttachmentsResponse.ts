/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreReviewAttachment } from './AppStoreReviewAttachment';
import type { AppStoreReviewDetail } from './AppStoreReviewDetail';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppStoreReviewAttachmentsResponse = {
    data: Array<AppStoreReviewAttachment>;
    included?: Array<AppStoreReviewDetail>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

