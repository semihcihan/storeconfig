/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterLeaderboardCreateRequest = {
    data: {
        type: GameCenterLeaderboardCreateRequest.type;
        attributes: {
            defaultFormatter: GameCenterLeaderboardFormatter;
            referenceName: string;
            vendorIdentifier: string;
            submissionType: GameCenterLeaderboardCreateRequest.submissionType;
            scoreSortType: GameCenterLeaderboardCreateRequest.scoreSortType;
            scoreRangeStart?: string;
            scoreRangeEnd?: string;
            recurrenceStartDate?: string;
            recurrenceDuration?: string;
            recurrenceRule?: string;
            activityProperties?: StringToStringMap;
            visibility?: GameCenterLeaderboardCreateRequest.visibility;
        };
        relationships?: {
            gameCenterDetail?: {
                data?: {
                    type: GameCenterLeaderboardCreateRequest.type;
                    id: string;
                };
            };
            gameCenterGroup?: {
                data?: {
                    type: GameCenterLeaderboardCreateRequest.type;
                    id: string;
                };
            };
            gameCenterLeaderboardSets?: {
                data?: Array<{
                    type: 'gameCenterLeaderboardSets';
                    id: string;
                }>;
            };
        };
    };
};
export namespace GameCenterLeaderboardCreateRequest {
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

