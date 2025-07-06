/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeCreateRequest = {
    data: {
        type: GameCenterChallengeCreateRequest.type;
        attributes: {
            referenceName: string;
            vendorIdentifier: string;
            allowedDurations?: Array<'ONE_DAY' | 'THREE_DAYS' | 'ONE_WEEK'>;
            challengeType: GameCenterChallengeCreateRequest.challengeType;
            repeatable?: boolean;
        };
        relationships?: {
            gameCenterDetail?: {
                data?: {
                    type: GameCenterChallengeCreateRequest.type;
                    id: string;
                };
            };
            gameCenterGroup?: {
                data?: {
                    type: GameCenterChallengeCreateRequest.type;
                    id: string;
                };
            };
            leaderboard?: {
                data?: {
                    type: GameCenterChallengeCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeCreateRequest {
    export enum type {
        GAME_CENTER_CHALLENGES = 'gameCenterChallenges',
    }
    export enum challengeType {
        LEADERBOARD = 'LEADERBOARD',
    }
}

