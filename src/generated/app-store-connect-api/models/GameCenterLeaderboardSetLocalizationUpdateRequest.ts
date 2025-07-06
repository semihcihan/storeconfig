/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetLocalizationUpdateRequest = {
    data: {
        type: GameCenterLeaderboardSetLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
        };
    };
};
export namespace GameCenterLeaderboardSetLocalizationUpdateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_LOCALIZATIONS = 'gameCenterLeaderboardSetLocalizations',
    }
}

