/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterChallenge = {
    type: GameCenterChallenge.type;
    id: string;
    attributes?: {
        referenceName?: string;
        vendorIdentifier?: string;
        allowedDurations?: Array<'ONE_DAY' | 'THREE_DAYS' | 'ONE_WEEK'>;
        archived?: boolean;
        challengeType?: GameCenterChallenge.challengeType;
        repeatable?: boolean;
    };
    relationships?: {
        gameCenterDetail?: {
            data?: {
                type: GameCenterChallenge.type;
                id: string;
            };
        };
        gameCenterGroup?: {
            data?: {
                type: GameCenterChallenge.type;
                id: string;
            };
        };
        versions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallengeVersions';
                id: string;
            }>;
        };
        leaderboard?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterChallenge.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterChallenge {
    export enum type {
        GAME_CENTER_CHALLENGES = 'gameCenterChallenges',
    }
    export enum challengeType {
        LEADERBOARD = 'LEADERBOARD',
    }
}

