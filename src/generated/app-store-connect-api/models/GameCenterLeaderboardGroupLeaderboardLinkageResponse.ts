/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type GameCenterLeaderboardGroupLeaderboardLinkageResponse = {
    data: {
        type: GameCenterLeaderboardGroupLeaderboardLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace GameCenterLeaderboardGroupLeaderboardLinkageResponse {
    export enum type {
        GAME_CENTER_LEADERBOARDS = 'gameCenterLeaderboards',
    }
}

