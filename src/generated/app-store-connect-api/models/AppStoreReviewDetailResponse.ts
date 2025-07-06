/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreReviewAttachment } from './AppStoreReviewAttachment';
import type { AppStoreReviewDetail } from './AppStoreReviewDetail';
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AppStoreReviewDetailResponse = {
    data: AppStoreReviewDetail;
    included?: Array<(AppStoreVersion | AppStoreReviewAttachment)>;
    links: DocumentLinks;
};

