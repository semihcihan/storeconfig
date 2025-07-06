/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAchievementLocalizationCreateRequest = {
    data: {
        type: GameCenterAchievementLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
            beforeEarnedDescription: string;
            afterEarnedDescription: string;
        };
        relationships: {
            gameCenterAchievement: {
                data: {
                    type: GameCenterAchievementLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterAchievementLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_LOCALIZATIONS = 'gameCenterAchievementLocalizations',
    }
}

