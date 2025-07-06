/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
export type GameCenterLeaderboardLocalizationCreateRequest = {
    data: {
        type: GameCenterLeaderboardLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
            formatterOverride?: GameCenterLeaderboardFormatter;
            formatterSuffix?: string;
            formatterSuffixSingular?: string;
        };
        relationships: {
            gameCenterLeaderboard: {
                data: {
                    type: GameCenterLeaderboardLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_LOCALIZATIONS = 'gameCenterLeaderboardLocalizations',
    }
}

