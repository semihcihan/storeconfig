/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type GameCenterEnabledVersionCompatibleVersionsLinkagesResponse = {
    data: Array<{
        type: 'gameCenterEnabledVersions';
        id: string;
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

