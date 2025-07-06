/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterPlayerAchievementSubmissionCreateRequest = {
    data: {
        type: GameCenterPlayerAchievementSubmissionCreateRequest.type;
        attributes: {
            bundleId: string;
            challengeIds?: Array<string>;
            percentageAchieved: number;
            scopedPlayerId: string;
            submittedDate?: string;
            vendorIdentifier: string;
        };
    };
};
export namespace GameCenterPlayerAchievementSubmissionCreateRequest {
    export enum type {
        GAME_CENTER_PLAYER_ACHIEVEMENT_SUBMISSIONS = 'gameCenterPlayerAchievementSubmissions',
    }
}

