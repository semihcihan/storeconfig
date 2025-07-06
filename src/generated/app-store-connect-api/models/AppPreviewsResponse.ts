/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreview } from './AppPreview';
import type { AppPreviewSet } from './AppPreviewSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppPreviewsResponse = {
    data: Array<AppPreview>;
    included?: Array<AppPreviewSet>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

