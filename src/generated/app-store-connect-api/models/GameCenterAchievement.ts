/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterAchievement = {
    type: GameCenterAchievement.type;
    id: string;
    attributes?: {
        referenceName?: string;
        vendorIdentifier?: string;
        points?: number;
        showBeforeEarned?: boolean;
        repeatable?: boolean;
        archived?: boolean;
        activityProperties?: StringToStringMap;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterAchievement.type;
                id: string;
            };
        };
        gameCenterGroup?: {
            data?: {
                type: GameCenterAchievement.type;
                id: string;
            };
        };
        /**
         * @deprecated
         */
        groupAchievement?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterAchievement.type;
                id: string;
            };
        };
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievementLocalizations';
                id: string;
            }>;
        };
        releases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievementReleases';
                id: string;
            }>;
        };
        activity?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterAchievement.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterAchievement {
    export enum type {
        GAME_CENTER_ACHIEVEMENTS = 'gameCenterAchievements',
    }
}

