/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterPlayerAchievementSubmission = {
    type: GameCenterPlayerAchievementSubmission.type;
    id: string;
    attributes?: {
        bundleId?: string;
        challengeIds?: Array<string>;
        percentageAchieved?: number;
        scopedPlayerId?: string;
        submittedDate?: string;
        vendorIdentifier?: string;
    };
    links?: ResourceLinks;
};
export namespace GameCenterPlayerAchievementSubmission {
    export enum type {
        GAME_CENTER_PLAYER_ACHIEVEMENT_SUBMISSIONS = 'gameCenterPlayerAchievementSubmissions',
    }
}

