/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetUpdateRequest = {
    data: {
        type: GameCenterLeaderboardSetUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
        };
    };
};
export namespace GameCenterLeaderboardSetUpdateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SETS = 'gameCenterLeaderboardSets',
    }
}

