/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardSetMemberLocalizationCreateRequest = {
    data: {
        type: GameCenterLeaderboardSetMemberLocalizationCreateRequest.type;
        attributes?: {
            name?: string;
            locale?: string;
        };
        relationships: {
            gameCenterLeaderboardSet: {
                data: {
                    type: GameCenterLeaderboardSetMemberLocalizationCreateRequest.type;
                    id: string;
                };
            };
            gameCenterLeaderboard: {
                data: {
                    type: GameCenterLeaderboardSetMemberLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterLeaderboardSetMemberLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_MEMBER_LOCALIZATIONS = 'gameCenterLeaderboardSetMemberLocalizations',
    }
}

