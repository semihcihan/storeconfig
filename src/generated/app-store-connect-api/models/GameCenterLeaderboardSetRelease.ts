/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardSetRelease = {
    type: GameCenterLeaderboardSetRelease.type;
    id: string;
    attributes?: {
        live?: boolean;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterLeaderboardSetRelease.type;
                id: string;
            };
        };
        gameCenterLeaderboardSet?: {
            data?: {
                type: GameCenterLeaderboardSetRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardSetRelease {
    export enum type {
        GAME_CENTER_LEADERBOARD_SET_RELEASES = 'gameCenterLeaderboardSetReleases',
    }
}

