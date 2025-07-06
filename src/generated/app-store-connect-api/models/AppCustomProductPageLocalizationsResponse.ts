/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { AppPreviewSet } from './AppPreviewSet';
import type { AppScreenshotSet } from './AppScreenshotSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppCustomProductPageLocalizationsResponse = {
    data: Array<AppCustomProductPageLocalization>;
    included?: Array<(AppCustomProductPageVersion | AppScreenshotSet | AppPreviewSet)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

