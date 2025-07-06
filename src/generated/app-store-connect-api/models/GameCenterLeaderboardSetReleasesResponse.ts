/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetRelease } from './GameCenterLeaderboardSetRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardSetReleasesResponse = {
    data: Array<GameCenterLeaderboardSetRelease>;
    included?: Array<(GameCenterDetail | GameCenterLeaderboardSet)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

