/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterActivity = {
    type: GameCenterActivity.type;
    id: string;
    attributes?: {
        referenceName?: string;
        vendorIdentifier?: string;
        playStyle?: GameCenterActivity.playStyle;
        minimumPlayersCount?: number;
        maximumPlayersCount?: number;
        supportsPartyCode?: boolean;
        archived?: boolean;
        properties?: StringToStringMap;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterActivity.type;
                id: string;
            };
        };
        gameCenterGroup?: {
            data?: {
                type: GameCenterActivity.type;
                id: string;
            };
        };
        achievements?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievements';
                id: string;
            }>;
        };
        leaderboards?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboards';
                id: string;
            }>;
        };
        versions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivityVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterActivity {
    export enum type {
        GAME_CENTER_ACTIVITIES = 'gameCenterActivities',
    }
    export enum playStyle {
        ASYNCHRONOUS = 'ASYNCHRONOUS',
        SYNCHRONOUS = 'SYNCHRONOUS',
    }
}

