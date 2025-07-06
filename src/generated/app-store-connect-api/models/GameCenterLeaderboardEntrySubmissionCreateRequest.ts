/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterLeaderboardEntrySubmissionCreateRequest = {
    data: {
        type: GameCenterLeaderboardEntrySubmissionCreateRequest.type;
        attributes: {
            bundleId: string;
            challengeIds?: Array<string>;
            context?: string;
            scopedPlayerId: string;
            score: string;
            submittedDate?: string;
            vendorIdentifier: string;
        };
    };
};
export namespace GameCenterLeaderboardEntrySubmissionCreateRequest {
    export enum type {
        GAME_CENTER_LEADERBOARD_ENTRY_SUBMISSIONS = 'gameCenterLeaderboardEntrySubmissions',
    }
}

