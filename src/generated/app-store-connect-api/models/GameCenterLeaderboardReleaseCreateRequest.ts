/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardReleaseCreateRequest = {
    data: {
        type: GameCenterLeaderboardReleaseCreateRequest.type;
        relationships: {
            gameCenterDetail: {
                data: {
                    type: GameCenterLeaderboardReleaseCreateRequest.type;
                    id: string;
                };
            };
            gameCenterLeaderboard: {
                data: {
                    type: GameCenterLeaderboardReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardReleaseCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_RELEASES = 'gameCenterLeaderboardReleases',
    }
}

