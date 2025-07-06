/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type GameCenterAchievementGroupAchievementLinkageResponse = {
    data: {
        type: GameCenterAchievementGroupAchievementLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace GameCenterAchievementGroupAchievementLinkageResponse {
    export enum type {
        GAME_CENTER_ACHIEVEMENTS = 'gameCenterAchievements',
    }
}

