/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardRelease = {
    type: GameCenterLeaderboardRelease.type;
    id: string;
    attributes?: {
        live?: boolean;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterLeaderboardRelease.type;
                id: string;
            };
        };
        gameCenterLeaderboard?: {
            data?: {
                type: GameCenterLeaderboardRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardRelease {
    export enum type {
        GAME_CENTER_LEADERBOARD_RELEASES = 'gameCenterLeaderboardReleases',
    }
}

