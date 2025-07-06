/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetMemberLocalization } from './GameCenterLeaderboardSetMemberLocalization';
export type GameCenterLeaderboardSetMemberLocalizationResponse = {
    data: GameCenterLeaderboardSetMemberLocalization;
    included?: Array<(GameCenterLeaderboardSet | GameCenterLeaderboard)>;
    links: DocumentLinks;
};

