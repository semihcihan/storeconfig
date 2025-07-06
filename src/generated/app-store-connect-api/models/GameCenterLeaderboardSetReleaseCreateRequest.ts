/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetReleaseCreateRequest = {
    data: {
        type: GameCenterLeaderboardSetReleaseCreateRequest.type;
        relationships: {
            gameCenterDetail: {
                data: {
                    type: GameCenterLeaderboardSetReleaseCreateRequest.type;
                    id: string;
                };
            };
            gameCenterLeaderboardSet: {
                data: {
                    type: GameCenterLeaderboardSetReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardSetReleaseCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_RELEASES = 'gameCenterLeaderboardSetReleases',
    }
}

