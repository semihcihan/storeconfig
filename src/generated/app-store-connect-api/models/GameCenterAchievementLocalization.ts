/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterAchievementLocalization = {
    type: GameCenterAchievementLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        beforeEarnedDescription?: string;
        afterEarnedDescription?: string;
    };
    relationships?: {
        gameCenterAchievement?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterAchievementLocalization.type;
                id: string;
            };
        };
        gameCenterAchievementImage?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterAchievementLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterAchievementLocalization {
    export enum type {
        GAME_CENTER_ACHIEVEMENT_LOCALIZATIONS = 'gameCenterAchievementLocalizations',
    }
}

