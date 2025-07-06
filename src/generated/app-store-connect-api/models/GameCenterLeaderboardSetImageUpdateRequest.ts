/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetImageUpdateRequest = {
    data: {
        type: GameCenterLeaderboardSetImageUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace GameCenterLeaderboardSetImageUpdateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_IMAGES = 'gameCenterLeaderboardSetImages',
    }
}

