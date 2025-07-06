/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardFormatter } from './GameCenterLeaderboardFormatter';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardLocalization = {
    type: GameCenterLeaderboardLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        formatterOverride?: GameCenterLeaderboardFormatter;
        formatterSuffix?: string;
        formatterSuffixSingular?: string;
    };
    relationships?: {
        gameCenterLeaderboard?: {
            data?: {
                type: GameCenterLeaderboardLocalization.type;
                id: string;
            };
        };
        gameCenterLeaderboardImage?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboardLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardLocalization {
    export enum type {
        GAME_CENTER_LEADERBOARD_LOCALIZATIONS = 'gameCenterLeaderboardLocalizations',
    }
}

