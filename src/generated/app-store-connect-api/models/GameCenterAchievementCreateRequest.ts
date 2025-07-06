/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterAchievementCreateRequest = {
    data: {
        type: GameCenterAchievementCreateRequest.type;
        attributes: {
            referenceName: string;
            vendorIdentifier: string;
            points: number;
            showBeforeEarned: boolean;
            repeatable: boolean;
            activityProperties?: StringToStringMap;
        };
        relationships?: {
            gameCenterDetail?: {
                data?: {
                    type: GameCenterAchievementCreateRequest.type;
                    id: string;
                };
            };
            gameCenterGroup?: {
                data?: {
                    type: GameCenterAchievementCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterAchievementCreateRequest {
    export enum type {
        GAME_CENTER_ACHIEVEMENTS = 'gameCenterAchievements',
    }
}

