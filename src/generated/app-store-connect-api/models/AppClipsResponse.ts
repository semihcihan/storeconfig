/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppClip } from './AppClip';
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppClipsResponse = {
    data: Array<AppClip>;
    included?: Array<(App | AppClipDefaultExperience)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

