/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAchievementImageUpdateRequest = {
    data: {
        type: GameCenterAchievementImageUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace GameCenterAchievementImageUpdateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_IMAGES = 'gameCenterAchievementImages',
    }
}

