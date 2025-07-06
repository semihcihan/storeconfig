/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAchievementReleaseCreateRequest = {
    data: {
        type: GameCenterAchievementReleaseCreateRequest.type;
        relationships: {
            gameCenterDetail: {
                data: {
                    type: GameCenterAchievementReleaseCreateRequest.type;
                    id: string;
                };
            };
            gameCenterAchievement: {
                data: {
                    type: GameCenterAchievementReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterAchievementReleaseCreateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_RELEASES = 'gameCenterAchievementReleases',
    }
}

