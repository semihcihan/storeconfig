/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardImageCreateRequest = {
    data: {
        type: GameCenterLeaderboardImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            gameCenterLeaderboardLocalization: {
                data: {
                    type: GameCenterLeaderboardImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardImageCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_IMAGES = 'gameCenterLeaderboardImages',
    }
}

