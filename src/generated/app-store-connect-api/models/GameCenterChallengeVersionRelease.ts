/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterChallengeVersionRelease = {
    type: GameCenterChallengeVersionRelease.type;
    id: string;
    relationships?: {
        version?: {
            data?: {
                type: GameCenterChallengeVersionRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterChallengeVersionRelease {
    export enum type {
        GAME_CENTER_CHALLENGE_VERSION_RELEASES = 'gameCenterChallengeVersionReleases',
    }
}

