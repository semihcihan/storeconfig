/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetRelease } from './GameCenterLeaderboardSetRelease';
export type GameCenterLeaderboardSetReleaseResponse = {
    data: GameCenterLeaderboardSetRelease;
    included?: Array<(GameCenterDetail | GameCenterLeaderboardSet)>;
    links: DocumentLinks;
};

