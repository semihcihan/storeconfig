/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetImage } from './GameCenterLeaderboardSetImage';
import type { GameCenterLeaderboardSetLocalization } from './GameCenterLeaderboardSetLocalization';
export type GameCenterLeaderboardSetLocalizationResponse = {
    data: GameCenterLeaderboardSetLocalization;
    included?: Array<(GameCenterLeaderboardSet | GameCenterLeaderboardSetImage)>;
    links: DocumentLinks;
};

