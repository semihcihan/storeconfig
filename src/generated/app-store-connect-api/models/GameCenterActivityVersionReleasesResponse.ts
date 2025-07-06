/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { GameCenterActivityVersionRelease } from './GameCenterActivityVersionRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterActivityVersionReleasesResponse = {
    data: Array<GameCenterActivityVersionRelease>;
    included?: Array<GameCenterActivityVersion>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

