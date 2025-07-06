/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterLeaderboardUpdateRequest = {
    data: {
        type: GameCenterLeaderboardUpdateRequest.type;
        id: string;
        attributes?: {
            defaultFormatter?: GameCenterLeaderboardFormatter;
            referenceName?: string;
            submissionType?: GameCenterLeaderboardUpdateRequest.submissionType;
            scoreSortType?: GameCenterLeaderboardUpdateRequest.scoreSortType;
            scoreRangeStart?: string;
            scoreRangeEnd?: string;
            recurrenceStartDate?: string;
            recurrenceDuration?: string;
            recurrenceRule?: string;
            archived?: boolean;
            activityProperties?: StringToStringMap;
            visibility?: GameCenterLeaderboardUpdateRequest.visibility;
        };
    };
};
export namespace GameCenterLeaderboardUpdateRequest {
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

