/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAchievementLocalizationUpdateRequest = {
    data: {
        type: GameCenterAchievementLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            beforeEarnedDescription?: string;
            afterEarnedDescription?: string;
        };
    };
};
export namespace GameCenterAchievementLocalizationUpdateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_LOCALIZATIONS = 'gameCenterAchievementLocalizations',
    }
}

