/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeUpdateRequest = {
    data: {
        type: GameCenterChallengeUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
            allowedDurations?: Array<'ONE_DAY' | 'THREE_DAYS' | 'ONE_WEEK'>;
            archived?: boolean;
            repeatable?: boolean;
        };
        relationships?: {
            leaderboard?: {
                data?: {
                    type: GameCenterChallengeUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeUpdateRequest {
    export enum type {
        GAME_CENTER_CHALLENGES = 'gameCenterChallenges',
    }
}

