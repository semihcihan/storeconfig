/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterLeaderboardEntrySubmission = {
    type: GameCenterLeaderboardEntrySubmission.type;
    id: string;
    attributes?: {
        bundleId?: string;
        challengeIds?: Array<string>;
        context?: string;
        scopedPlayerId?: string;
        score?: string;
        submittedDate?: string;
        vendorIdentifier?: string;
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardEntrySubmission {
    export enum type {
        GAME_CENTER_LEADERBOARD_ENTRY_SUBMISSIONS = 'gameCenterLeaderboardEntrySubmissions',
    }
}

