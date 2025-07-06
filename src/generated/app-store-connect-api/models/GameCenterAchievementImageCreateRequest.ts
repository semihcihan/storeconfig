/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAchievementImageCreateRequest = {
    data: {
        type: GameCenterAchievementImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            gameCenterAchievementLocalization: {
                data: {
                    type: GameCenterAchievementImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterAchievementImageCreateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_IMAGES = 'gameCenterAchievementImages',
    }
}

