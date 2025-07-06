/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterAchievementUpdateRequest = {
    data: {
        type: GameCenterAchievementUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
            points?: number;
            showBeforeEarned?: boolean;
            repeatable?: boolean;
            archived?: boolean;
            activityProperties?: StringToStringMap;
        };
    };
};
export namespace GameCenterAchievementUpdateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENTS = 'gameCenterAchievements',
    }
}

