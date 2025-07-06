/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetLocalizationCreateRequest = {
    data: {
        type: GameCenterLeaderboardSetLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
        };
        relationships: {
            gameCenterLeaderboardSet: {
                data: {
                    type: GameCenterLeaderboardSetLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardSetLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_LOCALIZATIONS = 'gameCenterLeaderboardSetLocalizations',
    }
}

