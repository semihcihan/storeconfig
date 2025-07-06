/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterAchievementRelease = {
    type: GameCenterAchievementRelease.type;
    id: string;
    attributes?: {
        live?: boolean;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterAchievementRelease.type;
                id: string;
            };
        };
        gameCenterAchievement?: {
            data?: {
                type: GameCenterAchievementRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterAchievementRelease {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_RELEASES = 'gameCenterAchievementReleases',
    }
}

