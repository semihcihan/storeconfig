/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetMemberLocalization } from './GameCenterLeaderboardSetMemberLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardSetMemberLocalizationsResponse = {
    data: Array<GameCenterLeaderboardSetMemberLocalization>;
    included?: Array<(GameCenterLeaderboardSet | GameCenterLeaderboard)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

