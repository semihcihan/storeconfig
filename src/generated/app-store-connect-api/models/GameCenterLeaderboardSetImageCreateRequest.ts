/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetImageCreateRequest = {
    data: {
        type: GameCenterLeaderboardSetImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            gameCenterLeaderboardSetLocalization: {
                data: {
                    type: GameCenterLeaderboardSetImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardSetImageCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_IMAGES = 'gameCenterLeaderboardSetImages',
    }
}

