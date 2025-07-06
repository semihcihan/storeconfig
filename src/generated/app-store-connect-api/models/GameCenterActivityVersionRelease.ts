/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterActivityVersionRelease = {
    type: GameCenterActivityVersionRelease.type;
    id: string;
    relationships?: {
        version?: {
            data?: {
                type: GameCenterActivityVersionRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterActivityVersionRelease {
    export enum type {
        GAME_CENTER_ACTIVITY_VERSION_RELEASES = 'gameCenterActivityVersionReleases',
    }
}

