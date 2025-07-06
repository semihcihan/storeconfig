/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardRelease } from './GameCenterLeaderboardRelease';
export type GameCenterLeaderboardReleaseResponse = {
    data: GameCenterLeaderboardRelease;
    included?: Array<(GameCenterDetail | GameCenterLeaderboard)>;
    links: DocumentLinks;
};

