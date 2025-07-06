/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardSet = {
    type: GameCenterLeaderboardSet.type;
    id: string;
    attributes?: {
        referenceName?: string;
        vendorIdentifier?: string;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterLeaderboardSet.type;
                id: string;
            };
        };
        gameCenterGroup?: {
            data?: {
                type: GameCenterLeaderboardSet.type;
                id: string;
            };
        };
        /**
         * @deprecated
         */
        groupLeaderboardSet?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboardSet.type;
                id: string;
            };
        };
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSetLocalizations';
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
        releases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSetReleases';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardSet {
    export enum type {
        GAME_CENTER_LEADERBOARD_SETS = 'gameCenterLeaderboardSets',
    }
}

