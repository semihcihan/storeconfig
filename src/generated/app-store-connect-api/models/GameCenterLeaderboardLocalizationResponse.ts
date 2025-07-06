/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardImage } from './GameCenterLeaderboardImage';
import type { GameCenterLeaderboardLocalization } from './GameCenterLeaderboardLocalization';
export type GameCenterLeaderboardLocalizationResponse = {
    data: GameCenterLeaderboardLocalization;
    included?: Array<(GameCenterLeaderboard | GameCenterLeaderboardImage)>;
    links: DocumentLinks;
};

