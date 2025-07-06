/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeVersionCreateRequest = {
    data: {
        type: GameCenterChallengeVersionCreateRequest.type;
        relationships: {
            challenge: {
                data: {
                    type: GameCenterChallengeVersionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeVersionCreateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_VERSIONS = 'gameCenterChallengeVersions',
    }
}

