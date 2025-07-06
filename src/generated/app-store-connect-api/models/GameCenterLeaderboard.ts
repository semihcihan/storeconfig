/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterLeaderboard = {
    type: GameCenterLeaderboard.type;
    id: string;
    attributes?: {
        defaultFormatter?: GameCenterLeaderboardFormatter;
        referenceName?: string;
        vendorIdentifier?: string;
        submissionType?: GameCenterLeaderboard.submissionType;
        scoreSortType?: GameCenterLeaderboard.scoreSortType;
        scoreRangeStart?: string;
        scoreRangeEnd?: string;
        recurrenceStartDate?: string;
        recurrenceDuration?: string;
        recurrenceRule?: string;
        archived?: boolean;
        activityProperties?: StringToStringMap;
        visibility?: GameCenterLeaderboard.visibility;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterLeaderboard.type;
                id: string;
            };
        };
        gameCenterGroup?: {
            data?: {
                type: GameCenterLeaderboard.type;
                id: string;
            };
        };
        /**
         * @deprecated
         */
        groupLeaderboard?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboard.type;
                id: string;
            };
        };
        gameCenterLeaderboardSets?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSets';
                id: string;
            }>;
        };
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardLocalizations';
                id: string;
            }>;
        };
        releases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardReleases';
                id: string;
            }>;
        };
        activity?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboard.type;
                id: string;
            };
        };
        challenge?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboard.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboard {
    export enum type {
        GAME_CENTER_LEADERBOARDS = 'gameCenterLeaderboards',
    }
    export enum submissionType {
        BEST_SCORE = 'BEST_SCORE',
        MOST_RECENT_SCORE = 'MOST_RECENT_SCORE',
    }
    export enum scoreSortType {
        ASC = 'ASC',
        DESC = 'DESC',
    }
    export enum visibility {
        SHOW_FOR_ALL = 'SHOW_FOR_ALL',
        HIDE_FOR_ALL = 'HIDE_FOR_ALL',
    }
}

