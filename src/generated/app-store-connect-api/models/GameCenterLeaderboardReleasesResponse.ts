/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardRelease } from './GameCenterLeaderboardRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardReleasesResponse = {
    data: Array<GameCenterLeaderboardRelease>;
    included?: Array<(GameCenterDetail | GameCenterLeaderboard)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

