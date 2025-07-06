/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEvent } from './AppEvent';
import type { AppEventLocalization } from './AppEventLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppEventsResponse = {
    data: Array<AppEvent>;
    included?: Array<AppEventLocalization>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

