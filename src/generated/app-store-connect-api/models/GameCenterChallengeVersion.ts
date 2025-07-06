/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterVersionState } from './GameCenterVersionState';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterChallengeVersion = {
    type: GameCenterChallengeVersion.type;
    id: string;
    attributes?: {
        version?: number;
        state?: GameCenterVersionState;
    };
    relationships?: {
        challenge?: {
            data?: {
                type: GameCenterChallengeVersion.type;
                id: string;
            };
        };
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallengeLocalizations';
                id: string;
            }>;
        };
        releases?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallengeVersionReleases';
                id: string;
            }>;
        };
        defaultImage?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterChallengeVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterChallengeVersion {
    export enum type {
        GAME_CENTER_CHALLENGE_VERSIONS = 'gameCenterChallengeVersions',
    }
}

