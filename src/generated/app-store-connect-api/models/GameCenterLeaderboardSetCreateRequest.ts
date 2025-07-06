/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetCreateRequest = {
    data: {
        type: GameCenterLeaderboardSetCreateRequest.type;
        attributes: {
            referenceName: string;
            vendorIdentifier: string;
        };
        relationships?: {
            gameCenterDetail?: {
                data?: {
                    type: GameCenterLeaderboardSetCreateRequest.type;
                    id: string;
                };
            };
            gameCenterGroup?: {
                data?: {
                    type: GameCenterLeaderboardSetCreateRequest.type;
                    id: string;
                };
            };
            gameCenterLeaderboards?: {
                data?: Array<{
                    type: 'gameCenterLeaderboards';
                    id: string;
                }>;
            };
        };
    };
};
export namespace GameCenterLeaderboardSetCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SETS = 'gameCenterLeaderboardSets',
    }
}

