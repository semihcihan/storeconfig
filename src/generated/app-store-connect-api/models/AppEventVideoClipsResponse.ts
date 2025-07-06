/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventLocalization } from './AppEventLocalization';
import type { AppEventVideoClip } from './AppEventVideoClip';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppEventVideoClipsResponse = {
    data: Array<AppEventVideoClip>;
    included?: Array<AppEventLocalization>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

