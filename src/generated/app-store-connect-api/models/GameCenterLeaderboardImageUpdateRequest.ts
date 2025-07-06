/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardImageUpdateRequest = {
    data: {
        type: GameCenterLeaderboardImageUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace GameCenterLeaderboardImageUpdateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_IMAGES = 'gameCenterLeaderboardImages',
    }
}

