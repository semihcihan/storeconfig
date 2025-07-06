/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
export type GameCenterLeaderboardLocalizationUpdateRequest = {
    data: {
        type: GameCenterLeaderboardLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            formatterOverride?: GameCenterLeaderboardFormatter;
            formatterSuffix?: string;
            formatterSuffixSingular?: string;
        };
    };
};
export namespace GameCenterLeaderboardLocalizationUpdateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_LOCALIZATIONS = 'gameCenterLeaderboardLocalizations',
    }
}

