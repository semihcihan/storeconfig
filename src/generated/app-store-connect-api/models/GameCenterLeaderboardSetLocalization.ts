/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardSetLocalization = {
    type: GameCenterLeaderboardSetLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
    };
    relationships?: {
        gameCenterLeaderboardSet?: {
            data?: {
                type: GameCenterLeaderboardSetLocalization.type;
                id: string;
            };
        };
        gameCenterLeaderboardSetImage?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboardSetLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardSetLocalization {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_LOCALIZATIONS = 'gameCenterLeaderboardSetLocalizations',
    }
}

