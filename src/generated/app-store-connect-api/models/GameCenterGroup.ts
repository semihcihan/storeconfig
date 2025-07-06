/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterGroup = {
    type: GameCenterGroup.type;
    id: string;
    attributes?: {
        referenceName?: string;
    };
    relationships?: {
        gameCenterDetails?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterDetails';
                id: string;
            }>;
        };
        gameCenterLeaderboards?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboards';
                id: string;
            }>;
        };
        gameCenterLeaderboardSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSets';
                id: string;
            }>;
        };
        gameCenterAchievements?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievements';
                id: string;
            }>;
        };
        gameCenterActivities?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivities';
                id: string;
            }>;
        };
        gameCenterChallenges?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallenges';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterGroup {
    export enum type {
        GAME_CENTER_GROUPS = 'gameCenterGroups',
    }
}

