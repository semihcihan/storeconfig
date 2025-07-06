/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetLocalization } from './GameCenterLeaderboardSetLocalization';
import type { GameCenterLeaderboardSetRelease } from './GameCenterLeaderboardSetRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardSetsResponse = {
    data: Array<GameCenterLeaderboardSet>;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterLeaderboardSet | GameCenterLeaderboardSetLocalization | GameCenterLeaderboard | GameCenterLeaderboardSetRelease)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

