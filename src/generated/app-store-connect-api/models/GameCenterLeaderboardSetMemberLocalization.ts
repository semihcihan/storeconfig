/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardSetMemberLocalization = {
    type: GameCenterLeaderboardSetMemberLocalization.type;
    id: string;
    attributes?: {
        name?: string;
        locale?: string;
    };
    relationships?: {
        gameCenterLeaderboardSet?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboardSetMemberLocalization.type;
                id: string;
            };
        };
        gameCenterLeaderboard?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterLeaderboardSetMemberLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardSetMemberLocalization {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_MEMBER_LOCALIZATIONS = 'gameCenterLeaderboardSetMemberLocalizations',
    }
}

