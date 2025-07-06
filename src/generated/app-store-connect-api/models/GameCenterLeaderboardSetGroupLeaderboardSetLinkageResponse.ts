/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse = {
    data: {
        type: GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse {
    export enum type {
        GAME_CENTER_LEADERBOARD_SETS = 'gameCenterLeaderboardSets',
    }
}

