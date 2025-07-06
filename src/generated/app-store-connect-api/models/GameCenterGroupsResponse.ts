/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterGroupsResponse = {
    data: Array<GameCenterGroup>;
    included?: Array<(GameCenterDetail | GameCenterLeaderboard | GameCenterLeaderboardSet | GameCenterAchievement | GameCenterActivity | GameCenterChallenge)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

