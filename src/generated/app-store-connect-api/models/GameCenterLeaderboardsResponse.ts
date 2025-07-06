/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardLocalization } from './GameCenterLeaderboardLocalization';
import type { GameCenterLeaderboardRelease } from './GameCenterLeaderboardRelease';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardsResponse = {
    data: Array<GameCenterLeaderboard>;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterLeaderboard | GameCenterLeaderboardSet | GameCenterLeaderboardLocalization | GameCenterLeaderboardRelease | GameCenterActivity | GameCenterChallenge)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

