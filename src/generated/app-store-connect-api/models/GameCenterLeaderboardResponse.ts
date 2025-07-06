/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardLocalization } from './GameCenterLeaderboardLocalization';
import type { GameCenterLeaderboardRelease } from './GameCenterLeaderboardRelease';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
export type GameCenterLeaderboardResponse = {
    data: GameCenterLeaderboard;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterLeaderboard | GameCenterLeaderboardSet | GameCenterLeaderboardLocalization | GameCenterLeaderboardRelease | GameCenterActivity | GameCenterChallenge)>;
    links: DocumentLinks;
};

