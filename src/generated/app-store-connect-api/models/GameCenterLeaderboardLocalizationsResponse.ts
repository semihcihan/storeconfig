/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardImage } from './GameCenterLeaderboardImage';
import type { GameCenterLeaderboardLocalization } from './GameCenterLeaderboardLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardLocalizationsResponse = {
    data: Array<GameCenterLeaderboardLocalization>;
    included?: Array<(GameCenterLeaderboard | GameCenterLeaderboardImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

