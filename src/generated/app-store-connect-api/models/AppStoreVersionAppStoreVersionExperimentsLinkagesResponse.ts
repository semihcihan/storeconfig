/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type AppStoreVersionAppStoreVersionExperimentsLinkagesResponse = {
    data: Array<{
        type: 'appStoreVersionExperiments';
        id: string;
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

