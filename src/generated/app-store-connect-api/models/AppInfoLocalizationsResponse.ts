/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppInfo } from './AppInfo';
import type { AppInfoLocalization } from './AppInfoLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppInfoLocalizationsResponse = {
    data: Array<AppInfoLocalization>;
    included?: Array<AppInfo>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

